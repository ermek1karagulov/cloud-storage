import React from "react";
import UploadFile from "./UploadFile";
import "./uploader.css";
import { useIsUploaderVisible, useUploadFiles } from "../../store/upload/hooks";
import { useAppDispatch } from "../../store";
import { hideUploader } from "../../store/upload/actions";

const Uploader = () => {
  const files = useUploadFiles();
  const isVisible = useIsUploaderVisible();
  const dispatch = useAppDispatch();

  return isVisible ? (
    <div className="uploader">
      <div className="uploader__header">
        <div className="uploader__title">Загрузки</div>
        <button
          className="uploader__close"
          onClick={() => dispatch(hideUploader())}
        >
          X
        </button>
      </div>
      {files.map((file) => (
        <UploadFile key={file._id} file={file} />
      ))}
    </div>
  ) : null;
};

export default Uploader;
