import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageUser } from "../../services/manageUser";

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
