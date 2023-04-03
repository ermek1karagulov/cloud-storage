import { createAction } from "@reduxjs/toolkit";
import { IFile } from "../../api/files.interfaces";
import { IFilesViewTypes } from "./reducer";

export const setFiles = createAction<IFile[]>("filesReducer/setFiles");
export const setCurrentDir = createAction<string>("filesReducer/setCurrentDir");

export const addFile = createAction<IFile>("filesReducer/addFile");
export const deleteFileInStore = createAction<string>(
  "filesReducer/deleteFile"
);

export const setPopupDisplay = createAction<"flex" | "none">(
  "filesReducer/setPopupDisplay"
);

export const pushToStack = createAction<string>("filesReducer/pushToStack");
export const popToStack = createAction("filesReducer/popToStack");

export const setFilesView = createAction<IFilesViewTypes>(
  "filesReducer/setFilesView"
);
