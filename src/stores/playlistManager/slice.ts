import { createSlice } from "@reduxjs/toolkit";
import {
  userPlaylistThunk,
  createPlaylistThunk,
  deletePlaylistThunk,
  getPlaylistDetailThunk
} from "./thunk";
import { userPlaylist, playlistDetail } from "../../types/playlist";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  userPlaylist: userPlaylist[] | [];
  playlistDetail: playlistDetail | null;
  loading: boolean;
};

const initialState: stateType = {
  userPlaylist: [],
  playlistDetail: null,
  loading: false,
};

export const managePlaylistSlice = createSlice({
  name: "managePlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userPlaylistThunk.fulfilled, (state, { payload }) => {
      state.userPlaylist = payload;
    });
    builder.addCase(createPlaylistThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(createPlaylistThunk.fulfilled, (state, { payload }) => {
      state.playlistDetail = payload;
      state.loading = false;
      toast.success(t("playlist.createSuccess"));
    });
    builder.addCase(createPlaylistThunk.rejected, (state) => {
      state.loading = false;
      toast.error(t("playlist.createFail"));
    });
    builder.addCase(deletePlaylistThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deletePlaylistThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      toast.success(t("playlist.deleteSuccess"));
    });
    builder.addCase(deletePlaylistThunk.rejected, (state) => {
      state.loading = false;
      toast.error(t("playlist.deleteFail"));
    });
    builder.addCase(getPlaylistDetailThunk.fulfilled, (state, { payload }) => {
      state.playlistDetail = payload;
    });
  },
});

export const {
  reducer: managePlaylistReducer,
  actions: managePlaylistActions,
} = managePlaylistSlice;
