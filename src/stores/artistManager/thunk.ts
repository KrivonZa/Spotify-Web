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
