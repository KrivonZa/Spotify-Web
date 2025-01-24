import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageFile } from "../../services/manageFile";
import { fileImage } from "../../types/file";

export const uploadImageThunk = createAsyncThunk(
  "uploadImage",
  async (req: fileImage, { rejectWithValue }) => {
    try {
      const data = await manageFile.fileImage(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);