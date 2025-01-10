import { combineReducers } from "@reduxjs/toolkit";
import { manageAuthReducer } from "./authManager/slice";

export const rootReducer = combineReducers({
    manageAuth: manageAuthReducer,
});
