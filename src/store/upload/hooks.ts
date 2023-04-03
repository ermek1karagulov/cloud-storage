import { useAppSelector } from "..";
import { IUploadFile } from "./reducer";

export const useIsUploaderVisible = (): boolean =>
  useAppSelector((state) => state.upload.isVisible);

export const useUploadFiles = (): IUploadFile[] =>
  useAppSelector((state) => state.upload.files);
