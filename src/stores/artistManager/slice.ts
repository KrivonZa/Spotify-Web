import { createSlice } from "@reduxjs/toolkit";
import { becomeArtistThunk } from "./thunk";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  loading: boolean;
};

const initialState: stateType = {
  loading: false,
};

export const manageArtistSlice = createSlice({
  name: "manageArtist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(becomeArtistThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(becomeArtistThunk.fulfilled, (state) => {
      toast.success(t("becomeArtist.success"));
      state.loading = false;
      window.location.href = "/playlist";
    });
    builder.addCase(becomeArtistThunk.rejected, (state) => {
      toast.error(t("becomeArtist.fail"));
      state.loading = false;
    });
  },
});

export const { reducer: manageArtistReducer, actions: manageArtistActions } =
  manageArtistSlice;
