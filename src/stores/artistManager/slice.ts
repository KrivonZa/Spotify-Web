import { createSlice } from "@reduxjs/toolkit";
import { becomeArtistThunk, getAllArtistThunk } from "./thunk";
import { artist } from "../../types/artist";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  loading: boolean;
  artist: artist[] | null;
};

const initialState: stateType = {
  loading: false,
  artist: null,
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
      setTimeout(() => {
        window.location.href = "/playlist";
      }, 3000);
    });
    builder.addCase(becomeArtistThunk.rejected, (state) => {
      toast.error(t("becomeArtist.fail"));
      state.loading = false;
    });
    builder.addCase(getAllArtistThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllArtistThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.artist = payload;
    });
    builder.addCase(getAllArtistThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: manageArtistReducer, actions: manageArtistActions } =
  manageArtistSlice;
