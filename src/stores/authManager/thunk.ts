import { createAsyncThunk } from "@reduxjs/toolkit";
import { manageAuth } from "../../services/manageAuth";
import { signup, login, forgetConfirm, resetPassword } from "../../types/auth";

export const checkEmailThunk = createAsyncThunk(
  "checkEmail",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageAuth.checkEmail(req);
      return data.data;
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
      const data = await manageAuth.signup(req);
      return data.data;
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
      const data = await manageAuth.login(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue((error as any).response.data);
    }
  }
);

export const forgetPassThunk = createAsyncThunk(
  "forgetPassword",
  async (req: string, { rejectWithValue }) => {
    try {
      const data = await manageAuth.forget(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const forgetConfirmThunk = createAsyncThunk(
  "forgetConfirm",
  async (req: forgetConfirm, { rejectWithValue }) => {
    try {
      const data = await manageAuth.forgetConfirm(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue(error);
    }
  }
);

export const resetPassThunk = createAsyncThunk(
  "resetPass",
  async (req: resetPassword, { rejectWithValue }) => {
    try {
      const data = await manageAuth.reset(req);
      return data.data;
    } catch (error) {
      console.log("API error:", error);
      return rejectWithValue((error as any).response.data);
    }
  }
);
