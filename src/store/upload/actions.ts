import { createAction } from "@reduxjs/toolkit";
import { IUploadFile } from "./reducer";

export const showUploader = createAction("uploadReducer/showUploader");
export const hideUploader = createAction("uploadReducer/hideUploader");

export const addUploadfile = createAction<IUploadFile>(
  "uploadReducer/addUploadfile"
);

export const deleteUploadfile = createAction<string>(
  "uploadReducer/deleteUploadfile"
);

export const changeUploadfile = createAction<IUploadFile>(
  "uploadReducer/changeUploadfile"
);
