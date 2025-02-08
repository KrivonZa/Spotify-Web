import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageMusic } from "../../services/manageMusic";

export const searchMusicThunk = createAsyncThunk(
  "searchMusic",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageMusic.searchMusic(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
