import React from "react";
import { useFiles, useFilesViewType } from "../../../../store/file/hooks";
import File from "./file/File";
import "./fileList.css";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { IFilesViewTypes } from "../../../../store/file/reducer";

const FileList = () => {
  const files = useFiles();
  const viewType = useFilesViewType();

  if (files.length === 0) {
    return <div className="loader">Файлы не найдены</div>;
  }

  if (viewType === IFilesViewTypes.PLATE) {
    return (
      <div className="fileplate">
        {files.map((file) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    );
  }

  return (
    <div className="filelist">
      <div className="filelist__header">
        <div className="filelist__name">Название</div>
        <div className="filelist__date">Дата</div>
        <div className="filelist__size">Размер</div>
      </div>
      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={"file"}
            exit={false}
          >
            <File file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default FileList;
