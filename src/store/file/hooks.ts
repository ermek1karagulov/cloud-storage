import { useAppSelector } from "..";

export const useCurrentDir = () =>
  useAppSelector((state) => state.files.currentDir);

export const useFiles = () => useAppSelector((state) => state.files.files);

export const usePopupDisplay = () =>
  useAppSelector((state) => state.files.popupDisplay);

export const useDirStack = () =>
  useAppSelector((state) => state.files.dirStack);

export const useFilesViewType = () =>
  useAppSelector((state) => state.files.view);
