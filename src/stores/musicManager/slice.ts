import { createSlice } from "@reduxjs/toolkit";
import {
  searchMusicThunk,
  getMusicByUserThunk,
  deleteMusicThunk,
  addMusicThunk,
  musicQueueThunk,
} from "./thunk";
import { getMusic } from "../../types/music";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  loading: boolean;
  searchMusic: getMusic[] | [];
  artistMusic: getMusic[] | [];
  musicQueue: getMusic[] | [];
};

const initialState: stateType = {
  loading: false,
  searchMusic: [],
  artistMusic: [],
  musicQueue: [],
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
    builder.addCase(getMusicByUserThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getMusicByUserThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.artistMusic = payload;
    });
    builder.addCase(deleteMusicThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteMusicThunk.fulfilled, (state) => {
      state.loading = false;
      toast.success(t("deleteMusic.deleteSuccess"));
    });
    builder.addCase(deleteMusicThunk.rejected, (state) => {
      state.loading = false;
      toast.error(t("deleteMusic.deleteFail"));
    });
    builder.addCase(addMusicThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addMusicThunk.fulfilled, (state) => {
      state.loading = false;
      toast.success(t("addMusic.addSuccess"));
      setTimeout(() => {
        window.location.reload();
      }, 500);
    });
    builder.addCase(addMusicThunk.rejected, (state) => {
      state.loading = false;
      toast.error(t("addMusic.addFail"));
    });
    builder.addCase(musicQueueThunk.fulfilled, (state, { payload }) => {
      state.musicQueue = payload;
    });
  },
});

export const { reducer: manageMusicReducer, actions: manageMusicActions } =
  manageMusicSlice;

export const { resetSearchMusic } = manageMusicSlice.actions;
