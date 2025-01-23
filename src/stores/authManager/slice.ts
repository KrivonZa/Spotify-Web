import { createSlice } from "@reduxjs/toolkit";
import {
  checkEmailThunk,
  signupThunk,
  loginThunk,
  forgetPassThunk,
  forgetConfirmThunk,
  resetPassThunk,
  changePassThunk
} from "./thunk";
import { checkEmail } from "../../types/auth";

type stateType = {
  checkEmail: checkEmail | null;
  loading: boolean;
  user: any;
};

const initialState: stateType = {
  checkEmail: null,
  loading: false,
  user: {},
};

export const manageAuthSlice = createSlice({
  name: "manageAuthen",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(checkEmailThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(checkEmailThunk.fulfilled, (state, { payload }) => {
      state.checkEmail = payload;
      state.loading = false;
    });
    builder.addCase(signupThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(signupThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(loginThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      localStorage.setItem("user", JSON.stringify(payload));
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(forgetPassThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgetPassThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(forgetConfirmThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(forgetConfirmThunk.fulfilled, (state) => {
      state.loading = false;
      localStorage.setItem("confirm", JSON.stringify(true));
    });
    builder.addCase(forgetConfirmThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(resetPassThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(resetPassThunk.fulfilled, (state) => {
      state.loading = false;
      
    });
    builder.addCase(resetPassThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(changePassThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(changePassThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(changePassThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: manageAuthReducer, actions: manageAuthActions } =
  manageAuthSlice;
