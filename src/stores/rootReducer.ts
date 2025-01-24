import { combineReducers } from "@reduxjs/toolkit";
import { manageAuthReducer } from "./authManager/slice";
import { manageUserReducer } from "./userManager/slice"
import { manageFileReducer } from "./fileManager/slice"
import { manageArtistReducer } from "./artistManager/slice"

export const rootReducer = combineReducers({
    manageAuth: manageAuthReducer,
    manageUser: manageUserReducer,
    manageFile: manageFileReducer,
    manageArtist: manageArtistReducer,
});
