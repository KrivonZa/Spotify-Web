import { createSlice } from "@reduxjs/toolkit";
import { uploadImageThunk, uploadAudioThunk } from "./thunk";
import { dataImageFile } from "../../types/file";

type stateType = {
  dataImageFile: dataImageFile | null;
  loading: boolean;
};

const initialState: stateType = {
  dataImageFile: null,
  loading: false,
};

export const manageFileSlice = createSlice({
  name: "manageFile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(uploadImageThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadImageThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.dataImageFile = payload;
    });
    builder.addCase(uploadImageThunk.rejected, (state) => {
      state.loading = false;
    });
    builder.addCase(uploadAudioThunk.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(uploadAudioThunk.fulfilled, (state, { payload }) => {
      state.loading = false;
    });
    builder.addCase(uploadAudioThunk.rejected, (state) => {
      state.loading = false;
    });
  },
});

export const { reducer: manageFileReducer, actions: manageFileActions } =
  manageFileSlice;
