import { createSlice } from "@reduxjs/toolkit";
import { searchMusicThunk } from "./thunk";
import { getMusic } from "../../types/music";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  loading: boolean;
  searchMusic: getMusic[] | null;
};

const initialState: stateType = {
  loading: false,
  searchMusic: null,
};

export const manageMusicSlice = createSlice({
  name: "manageMusic",
  initialState,
  reducers: {
    resetSearchMusic: (state) => {
      state.searchMusic = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(searchMusicThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchMusicThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.searchMusic = payload;
    });
    builder.addCase(searchMusicThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: manageMusicReducer, actions: manageMusicActions } =
  manageMusicSlice;

  export const { resetSearchMusic } = manageMusicSlice.actions;
