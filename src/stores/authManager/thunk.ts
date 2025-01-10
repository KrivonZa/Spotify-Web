import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageAuth } from "../../services/manageAuth";
import { signup, login } from "../../types/auth" 

export const checkEmailThunk = createAsyncThunk(
  "checkEmail",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageAuth.checkEmail(req)
      return data.data
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const signupThunk = createAsyncThunk(
  "signup",
  async (req: signup, { rejectWithValue }) => {
    try {
      const data = await manageAuth.signup(req)
      return data.data
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (req: login, { rejectWithValue }) => {
    try {
      const data = await manageAuth.login(req)
      return data.data
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue((error as any).response.data);
    }
  }
);