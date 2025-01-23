import { createSlice } from "@reduxjs/toolkit";
import { userInfoThunk } from "./thunk";
import { userInfo } from "../../types/user";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  userInfo: userInfo | null;
  loading: boolean;
};

const initialState: stateType = {
  userInfo: null,
  loading: false,
};

export const manageUserSlice = createSlice({
  name: "manageUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userInfoThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(userInfoThunk.fulfilled, (state, { payload }) => {
      state.userInfo = payload;
      state.loading = false;
    });
    builder.addCase(userInfoThunk.rejected, (state, { payload }) => {
      localStorage.removeItem("user");
      state.userInfo = null;
      toast.error(t("profile.tokenExpired"));
      state.loading = false;
    });
  },
});

export const { reducer: manageUserReducer, actions: manageUserActions } =
  manageUserSlice;
