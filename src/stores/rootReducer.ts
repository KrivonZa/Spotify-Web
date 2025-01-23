import { combineReducers } from "@reduxjs/toolkit";
import { manageAuthReducer } from "./authManager/slice";
import { manageUserReducer } from "./userManager/slice"

export const rootReducer = combineReducers({
    manageAuth: manageAuthReducer,
    manageUser: manageUserReducer,
});
