import { createReducer } from "@reduxjs/toolkit";
import { IFile } from "../../api/files.interfaces";
import {
  addFile,
  deleteFileInStore,
  popToStack,
  pushToStack,
  setCurrentDir,
  setFiles,
  setPopupDisplay,
  setFilesView,
} from "./actions";

export enum IFilesViewTypes {
  PLATE = "plate",
  LIST = "list",
}

interface IFilesReducer {
  files: [] | IFile[];
  currentDir: null | string;
  popupDisplay: "flex" | "none";
  dirStack: string[];
  view: IFilesViewTypes;
}

const initialState: IFilesReducer = {
  files: [],
  currentDir: null,
  popupDisplay: "none",
  dirStack: [],
  view: IFilesViewTypes.LIST,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setFiles, (state, { payload }): IFilesReducer => {
      return {
        ...state,
        files: payload,
      };
    })
    .addCase(setCurrentDir, (state, { payload }): IFilesReducer => {
      return {
        ...state,
        currentDir: payload,
      };
    })
    .addCase(addFile, (state, { payload }): IFilesReducer => {
      return {
        ...state,
        files: [...state.files, payload],
      };
    })
    .addCase(setPopupDisplay, (state, { payload }): IFilesReducer => {
      return {
        ...state,
        popupDisplay: payload,
      };
    })
    .addCase(pushToStack, (state, { payload }): IFilesReducer => {
      return {
        ...state,
        dirStack: [...state.dirStack, payload],
      };
    })
    .addCase(popToStack, (state): IFilesReducer => {
      return {
        ...state,
        dirStack: [...state.dirStack].slice(0, state.dirStack.length - 1),
      };
    })
    .addCase(deleteFileInStore, (state, { payload }): IFilesReducer => {
      return {
        ...state,
        files: [...state.files.filter((file) => file._id !== payload)],
      };
    })
    .addCase(setFilesView, (state, { payload }): IFilesReducer => {
      return {
        ...state,
        view: payload,
      };
    });
});
