import { createSlice } from "@reduxjs/toolkit";
import { getAllMusicThunk } from "./thunk";
import { getMusic } from "../../types/music";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  loading: boolean;
  music: getMusic[] | null;
};

const initialState: stateType = {
  loading: false,
  music: null,
};

export const manageMusicSlice = createSlice({
  name: "manageMusic",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getAllMusicThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllMusicThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.music = payload;
    });
    builder.addCase(getAllMusicThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: manageMusicReducer, actions: manageMusicActions } =
  manageMusicSlice;
