import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: [],
  reducers: {
    addFeed: (_, action) => {
      return action.payload;
    },
    removeFeed: (state: any, action: any) => {
      return state?.filter((feed: any) => feed?._id !== action?.payload);
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
