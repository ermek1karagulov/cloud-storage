import { createReducer } from "@reduxjs/toolkit";
import { hideLoader, showLoader } from "./actions";

interface IAppReducer {
  loader: boolean;
}

const initialState: IAppReducer = {
  loader: false,
};

export default createReducer(initialState, (builder) => {
  builder
    .addCase(showLoader, (state): IAppReducer => {
      return {
        ...state,
        loader: true,
      };
    })
    .addCase(hideLoader, (state): IAppReducer => {
      return {
        ...state,
        loader: false,
      };
    });
});
