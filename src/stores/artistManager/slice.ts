import { createSlice } from "@reduxjs/toolkit";
import {
  becomeArtistThunk,
  searchArtistThunk,
  getAllArtistThunk,
} from "./thunk";
import { artist } from "../../types/artist";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  loading: boolean;
  searchArtist: artist[] | null;
  getAllArtist: artist[] | null;
};

const initialState: stateType = {
  loading: false,
  searchArtist: null,
  getAllArtist: null,
};

export const manageArtistSlice = createSlice({
  name: "manageArtist",
  initialState,
  reducers: {
    resetSearchArtist: (state) => {
      state.searchArtist = null;
    },
  },
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
    builder.addCase(searchArtistThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchArtistThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.searchArtist = payload;
    });
    builder.addCase(searchArtistThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(getAllArtistThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.getAllArtist = payload;
    });
  },
});

export const { reducer: manageArtistReducer, actions: manageArtistActions } =
  manageArtistSlice;

export const { resetSearchArtist } = manageArtistSlice.actions;
