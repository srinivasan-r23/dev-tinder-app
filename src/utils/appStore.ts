import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedSlicer from './feedSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        feed: feedSlicer
    },
});
export default appStore;