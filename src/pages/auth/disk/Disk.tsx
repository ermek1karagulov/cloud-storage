import React, { useEffect, useState } from "react";
import agent from "../../../api/agent";
import { useAppDispatch } from "../../../store";
import {
  addFile,
  popToStack,
  setCurrentDir,
  setFiles,
  setFilesView,
  setPopupDisplay,
} from "../../../store/file/actions";
import { useCurrentDir, useDirStack } from "../../../store/file/hooks";
import FileList from "./fileList/FileList";
import "./disk.css";
import Popup from "./Popup";
import {
  addUploadfile,
  changeUploadfile,
  showUploader,
} from "../../../store/upload/actions";
import Uploader from "../../../components/uploader/Uploader";
import { useAppLoader } from "../../../store/app/hooks";
import { hideLoader, showLoader } from "../../../store/app/actions";
import { IFilesViewTypes } from "../../../store/file/reducer";

enum DRAG_TYPES {
  ENTER = "ENTER",
  LEAVE = "LEAVE",
  DROP = "DROP",
}

enum SORT_TYPES {
  TYPE = "type",
  DATE = "date",
  NAME = "name",
}

const Disk = () => {
  const { getFiles, uploadFile } = agent.files;
  const dispatch = useAppDispatch();
  const currentDir = useCurrentDir();
  const dirStack = useDirStack();
  const loader = useAppLoader();
  const [dragEnter, setDragEnter] = useState(false);
  const [sort, setSort] = useState(SORT_TYPES.TYPE);

  useEffect(() => {
    dispatch(showLoader());
    getFiles(currentDir, sort)
      .then((res) => {
        dispatch(setFiles(res));
      })
      .finally(() => dispatch(hideLoader()));
  }, [currentDir, sort]);

  const showPopup = () => {
    dispatch(setPopupDisplay("flex"));
  };

  const backClickHander = () => {
    const backDirId = [...dirStack].pop();
    dispatch(popToStack());
    dispatch(setCurrentDir(backDirId as string));
  };

  const fileUploadHandler = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    if (currentDir) {
      formData.append("parent", currentDir);
    }

    const uploadingFile = { name: file.name, progress: 0, _id: Date.now() };
    dispatch(showUploader());
    dispatch(addUploadfile(uploadingFile as any));

    const res = await uploadFile(formData, {
      onUploadProgress: (progressEvent: any) => {
        console.log("progressEvent", progressEvent);

        const totalLength = progressEvent.event.lengthComputable
          ? progressEvent.total
          : progressEvent.event.target.getResponseHeader("content-length") ||
            progressEvent.event.target.getResponseHeader(
              "x-decompressed-content-length"
            );

        if (totalLength) {
          uploadingFile.progress = Math.round(
            (progressEvent.loaded * 100) / totalLength
          );

          dispatch(changeUploadfile(uploadingFile as any));
        }
      },
    });
    dispatch(addFile(res));
  };

  const filesUploadHandler = (event: any) => {
    const files = [...event.target.files];
    files.forEach(fileUploadHandler);
  };

  const dragHandler = (
    event: React.DragEvent<HTMLDivElement>,
    dragType: DRAG_TYPES
  ) => {
    event.preventDefault();
    event.stopPropagation();

    switch (dragType) {
      case DRAG_TYPES.ENTER:
        setDragEnter(true);
        break;
      case DRAG_TYPES.LEAVE:
        setDragEnter(false);
        break;
      case DRAG_TYPES.DROP:
        const files = Array.from(event.dataTransfer.files);
        files.forEach(fileUploadHandler);
        setDragEnter(false);
        break;
    }
  };

  if (loader) {
    return (
      <div className="loader">
        <div className="lds-dual-ring"></div>
      </div>
    );
  }

  return !dragEnter ? (
    <div
      className="disk"
      onDragEnter={(e) => dragHandler(e, DRAG_TYPES.ENTER)}
      onDragLeave={(e) => dragHandler(e, DRAG_TYPES.LEAVE)}
      onDragOver={(e) => dragHandler(e, DRAG_TYPES.ENTER)}
    >
      <div className="disk__btns">
        <button className="disk__back" onClick={backClickHander}>
          Назад
        </button>
        <button className="disk__create" onClick={showPopup}>
          Создать папку
        </button>
        <div className="disk__upload">
          <label htmlFor="disk__upload-input" className="disk__upload-label">
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => filesUploadHandler(event)}
            type="file"
            id="disk__upload-input"
            className="disk__upload-input"
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value as SORT_TYPES)}
          className="disk__select"
        >
          <option value={SORT_TYPES.NAME}>По имени</option>
          <option value={SORT_TYPES.TYPE}>По типу</option>
          <option value={SORT_TYPES.DATE}>По дате</option>
        </select>
        <button
          className="disk__plate"
          onClick={() => dispatch(setFilesView(IFilesViewTypes.PLATE))}
        />
        <button
          className="disk__list"
          onClick={() => dispatch(setFilesView(IFilesViewTypes.LIST))}
        />
      </div>
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className="drop-area"
      onDrop={(e) => dragHandler(e, DRAG_TYPES.DROP)}
      onDragEnter={(e) => dragHandler(e, DRAG_TYPES.ENTER)}
      onDragLeave={(e) => dragHandler(e, DRAG_TYPES.LEAVE)}
      onDragOver={(e) => dragHandler(e, DRAG_TYPES.ENTER)}
    >
      Перетащите файлы сюда
    </div>
  );
};

export default Disk;
