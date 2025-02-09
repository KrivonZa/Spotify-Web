import { createSlice } from "@reduxjs/toolkit";
import {
  userPlaylistThunk,
  createPlaylistThunk,
  deletePlaylistThunk,
  getPlaylistDetailThunk,
  getAllPlaylistThunk,
  addToPlaylistThunk,
} from "./thunk";
import { userPlaylist, playlistDetail, Playlist } from "../../types/playlist";
import { toast } from "react-toastify";
import { t } from "i18next";

type stateType = {
  userPlaylist: userPlaylist | null;
  playlistDetail: playlistDetail | null;
  allPlaylist: Playlist[] | [];
  loading: boolean;
};

const initialState: stateType = {
  userPlaylist: null,
  playlistDetail: null,
  allPlaylist: [],
  loading: false,
};

export const managePlaylistSlice = createSlice({
  name: "managePlaylist",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(userPlaylistThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.userPlaylist = payload;
    });
    builder.addCase(userPlaylistThunk.rejected, (state) => {
      state.loading = false;
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
    builder.addCase(deletePlaylistThunk.fulfilled, (state) => {
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
    builder.addCase(getAllPlaylistThunk.fulfilled, (state, { payload }) => {
      state.allPlaylist = payload;
    });
    builder.addCase(addToPlaylistThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addToPlaylistThunk.fulfilled, (state) => {
      state.loading = false;
      toast.success(t("addToPlaylist.addSuccess"));
    });
    builder.addCase(addToPlaylistThunk.rejected, (state) => {
      state.loading = false;
      toast.error(t("addToPlaylist.addFail"));
    });
  },
});

export const {
  reducer: managePlaylistReducer,
  actions: managePlaylistActions,
} = managePlaylistSlice;
