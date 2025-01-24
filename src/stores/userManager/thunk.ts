import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageUser } from "../../services/manageUser";
import { editProfile1, editProfile2 } from "../../types/user";

export const userInfoThunk = createAsyncThunk(
  "userInfo",
  async (_, { rejectWithValue }) => {
    try {
      const data = await manageUser.userInfo();
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const updateInfo1Thunk = createAsyncThunk(
  "updateInfo1",
  async (req: editProfile1, { rejectWithValue }) => {
    try {
      const data = await manageUser.update1(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const updateInfo2Thunk = createAsyncThunk(
  "updateInfo2",
  async (req: editProfile2, { rejectWithValue }) => {
    try {
      const data = await manageUser.update2(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);
