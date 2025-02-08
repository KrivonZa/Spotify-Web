import { createAsyncThunk } from "@reduxjs/toolkit";
import { managePlaylist } from "../../services/managePlaylist";

export const userPlaylistThunk = createAsyncThunk(
  "userPlaylist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.getUserPlaylist();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const createPlaylistThunk = createAsyncThunk(
  "createPlaylist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.createPlaylist();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const deletePlaylistThunk = createAsyncThunk(
  "deletePlaylist",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.deletePlaylist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getAllPlaylistThunk = createAsyncThunk(
  "getAllPlaylist",
  async (_, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.getAllPlaylist();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getPlaylistDetailThunk = createAsyncThunk(
  "getPlaylistDetail",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.getPlaylistDetail(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
