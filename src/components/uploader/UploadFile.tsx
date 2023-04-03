import React from "react";
import "./uploader.css";
import { useDispatch } from "react-redux";
import { IUploadFile } from "../../store/upload/reducer";
import { deleteUploadfile } from "../../store/upload/actions";

const UploadFile = ({ file }: { file: IUploadFile }) => {
  const dispatch = useDispatch();

  return (
    <div className="upload-file">
      <div className="upload-file__header">
        <div className="upload-file__name">{file.name}</div>
        <button
          className="upload-file__remove"
          onClick={() => dispatch(deleteUploadfile(file._id))}
        >
          X
        </button>
      </div>
      <div className="upload-file__progress-bar">
        <div
          className="upload-file__upload-bar"
          style={{ width: file.progress + "%" }}
        />
        <div className="upload-file__percent">{file.progress}%</div>
      </div>
    </div>
  );
};

export default UploadFile;
