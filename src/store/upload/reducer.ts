import { createReducer } from "@reduxjs/toolkit";
import { IFile } from "../../api/files.interfaces";
import {
  addUploadfile,
  changeUploadfile,
  deleteUploadfile,
  hideUploader,
  showUploader,
} from "./actions";

export interface IUploadFile extends IFile {
  progress: number;
}

interface IUploadReducer {
  isVisible: boolean;
  files: IUploadFile[];
}

const initialState: IUploadReducer = {
  isVisible: false,
  files: [],
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(showUploader, (state): IUploadReducer => {
      return {
        ...state,
        isVisible: true,
      };
    })
    .addCase(hideUploader, (state): IUploadReducer => {
      return {
        ...state,
        isVisible: false,
      };
    })
    .addCase(addUploadfile, (state, { payload }): IUploadReducer => {
      return {
        ...state,
        files: [...state.files, { ...payload }],
      };
    })
    .addCase(deleteUploadfile, (state, { payload }): IUploadReducer => {
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== payload)],
      };
    })
    .addCase(changeUploadfile, (state, { payload }): IUploadReducer => {
      return {
        ...state,
        files: [
          ...state.files.map((file) =>
            file._id === payload._id
              ? { ...file, progress: payload.progress }
              : { ...file }
          ),
        ],
      };
    });
});
