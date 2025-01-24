import { createSlice } from "@reduxjs/toolkit";
import { userInfoThunk, updateInfo1Thunk, updateInfo2Thunk } from "./thunk";
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
    builder.addCase(userInfoThunk.rejected, (state) => {
      localStorage.removeItem("user");
      state.userInfo = null;
      toast.error(t("profile.tokenExpired"));
      state.loading = false;
    });
    builder.addCase(updateInfo1Thunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInfo1Thunk.fulfilled, (state) => {
      state.loading = false;
      toast.success(t("editProfile.success1"));
    });
    builder.addCase(updateInfo1Thunk.rejected, (state) => {
      state.loading = false;
      toast.error(t("editProfile.fail1"));
    });
    builder.addCase(updateInfo2Thunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateInfo2Thunk.fulfilled, (state) => {
      state.loading = false;
      toast.success(t("editProfile.success2"));
    });
    builder.addCase(updateInfo2Thunk.rejected, (state) => {
      state.loading = false;
      toast.error(t("editProfile.fail2"));
    });
  },
});

export const { reducer: manageUserReducer, actions: manageUserActions } =
  manageUserSlice;
