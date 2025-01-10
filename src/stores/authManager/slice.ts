import { createSlice } from "@reduxjs/toolkit";
import { checkEmailThunk, signupThunk, loginThunk } from "./thunk";
import { checkEmail } from "../../types/auth";

type stateType = {
  checkEmail: checkEmail | null;
  loading: boolean;
};

const initialState: stateType = {
  checkEmail: null,
  loading: false,
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
    builder.addCase(loginThunk.fulfilled, (state) => {
      state.loading = false;
    });
    builder.addCase(loginThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: manageAuthReducer, actions: manageAuthActions } =
  manageAuthSlice;
