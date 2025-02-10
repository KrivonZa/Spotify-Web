import { createAsyncThunk } from "@reduxjs/toolkit";
import { managePlaylist } from "../../services/managePlaylist";
import { addToPlaylist, updatePlaylist } from "../../types/playlist";

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

export const addToPlaylistThunk = createAsyncThunk(
  "addToPlaylist",
  async (req: addToPlaylist, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.addMusicToPlaylist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const updatePlaylistThunk = createAsyncThunk(
  "updatePlaylist",
  async (req: updatePlaylist, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.updatePlaylist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const getArtistPlaylistThunk = createAsyncThunk(
  "getArtistPlaylist",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.getPlaylistByArtist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const removeFromPlaylistThunk = createAsyncThunk(
  "removeFromPlaylist",
  async (req: addToPlaylist, { rejectWithValue }) => {
    try {
      const data = await managePlaylist.removeFromPlaylist(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
