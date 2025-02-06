import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageMusic } from "../../services/manageMusic";

export const getAllMusicThunk = createAsyncThunk(
  "getAllMusic",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageMusic.getAllMusic(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
