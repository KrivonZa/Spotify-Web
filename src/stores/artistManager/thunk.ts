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

export const searchArtistThunk = createAsyncThunk(
  "searchArtist",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageArtist.searchArtist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getAllArtistThunk = createAsyncThunk(
  "getAllArtist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageArtist.getAllArtist();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
