import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import user from "./user/reducer";
import files from "./file/reducer";
import upload from "./upload/reducer";
import app from "./app/reducer";

export const store = configureStore({
  reducer: {
    user,
    files,
    upload,
    app,
  },
});

export type AppState = ReturnType<typeof store.getState>;

export const useAppDispatch = () => useDispatch();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
