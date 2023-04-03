import { createReducer } from "@reduxjs/toolkit";
import { IUserModel } from "../../api/user.interfaces";
import { logout, setUser } from "./actions";

interface IUserReducerState {
  currentUser: null | IUserModel;
  isAuth: boolean;
}

const initialState: IUserReducerState = {
  currentUser: null,
  isAuth: false,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(setUser, (state, { payload }): IUserReducerState => {
      if (payload.token) {
        localStorage.setItem("accessToken", payload.token);
      }

      return {
        ...state,
        currentUser: payload.user,
        isAuth: true,
      };
    })
    .addCase(logout, (state): IUserReducerState => {
      localStorage.removeItem("accessToken");

      return {
        ...state,
        currentUser: null,
        isAuth: false,
      };
    });
});
