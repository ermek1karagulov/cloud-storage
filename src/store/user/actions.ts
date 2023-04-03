import { createAction } from "@reduxjs/toolkit";
import { IUserModel } from "../../api/user.interfaces";

export const setUser = createAction<{ user: IUserModel; token?: string }>(
  "userReducer/setUser"
);
export const logout = createAction("userReducer/logout");
