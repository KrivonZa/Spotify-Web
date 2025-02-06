import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageArtist } from "../../services/manageArtist";

export const becomeArtistThunk = createAsyncThunk(
  "becomeArtist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageArtist.becomeArtist();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getAllArtistThunk = createAsyncThunk(
  "getAllArtist",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageArtist.getAllArtist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
