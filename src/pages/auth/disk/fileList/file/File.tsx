import React from "react";
import "./file.css";
import { IFile } from "../../../../../api/files.interfaces";
//@ts-ignore
import DirLogo from "../../../../../assets/img/dir.svg";
//@ts-ignore
import FileLogo from "../../../../../assets/img/file.svg";
import { useAppDispatch } from "../../../../../store";
import {
  deleteFileInStore,
  pushToStack,
  setCurrentDir,
} from "../../../../../store/file/actions";
import {
  useCurrentDir,
  useFilesViewType,
} from "../../../../../store/file/hooks";
import agent from "../../../../../api/agent";
import { sizeFormat } from "../../../../../utils/sizeFormat";
import { IFilesViewTypes } from "../../../../../store/file/reducer";

const File = ({ file }: { file: IFile }) => {
  const { downloadFile, deleteFile } = agent.files;
  const dispatch = useAppDispatch();
  const currentDir = useCurrentDir();
  const viewType = useFilesViewType();

  const openDirHandler = () => {
    if (file.type !== "dir") return;

    if (currentDir) {
      dispatch(pushToStack(currentDir));
    }
    dispatch(setCurrentDir(file._id));
  };

  const downloadClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    downloadFile(file);
  };

  const deleteFileHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      e.stopPropagation();
      const res = await deleteFile(file);
      dispatch(deleteFileInStore(file._id));
      alert(res.message);
    } catch (e) {
      console.error(e);
      alert("Delete error maybe dir is not empty");
    }
  };

  if (viewType === IFilesViewTypes.PLATE) {
    return (
      <div className="file-plate" onClick={openDirHandler}>
        <img
          src={file.type === "dir" ? DirLogo : FileLogo}
          alt=""
          className="file-plate__img"
        />
        <div className="file-plate__name">{file.name}</div>
        <div className="file-plate__btns">
          {file.type !== "dir" && (
            <button
              onClick={(e) => downloadClickHandler(e)}
              className="file-plate__btn file-plate__download"
            >
              download
            </button>
          )}
          <button
            onClick={(e) => deleteFileHandler(e)}
            className="file-plate__btn file-plate__delete"
          >
            delete
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="file" onClick={openDirHandler}>
        <img
          src={file.type === "dir" ? DirLogo : FileLogo}
          alt=""
          className="file__img"
        />
        <div className="file__name">{file.name}</div>
        <div className="file__date">{file.date.slice(0, 10)}</div>
        <div className="file__size">{sizeFormat(file.size)}</div>
        {file.type !== "dir" && (
          <button
            onClick={(e) => downloadClickHandler(e)}
            className="file__btn file__download"
          >
            download
          </button>
        )}
        <button onClick={deleteFileHandler} className="file__btn file__delete">
          delete
        </button>
      </div>
    );
  }
};

export default File;
