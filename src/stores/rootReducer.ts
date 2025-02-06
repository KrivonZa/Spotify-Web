import { combineReducers } from "@reduxjs/toolkit";
import { manageAuthReducer } from "./authManager/slice";
import { manageUserReducer } from "./userManager/slice"
import { manageFileReducer } from "./fileManager/slice"
import { manageArtistReducer } from "./artistManager/slice"
import { managePlaylistReducer } from "./playlistManager/slice"
import { manageMusicReducer } from "./musicManager/slice"

export const rootReducer = combineReducers({
    manageAuth: manageAuthReducer,
    manageUser: manageUserReducer,
    manageFile: manageFileReducer,
    manageArtist: manageArtistReducer,
    managePlaylist: managePlaylistReducer,
    manageMusic: manageMusicReducer,
});
