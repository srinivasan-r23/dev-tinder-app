import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (_, action) => {
      return action?.payload;
    },
  },
});

export default requestSlice.reducer;
export const { addRequest } = requestSlice.actions;
