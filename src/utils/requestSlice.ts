import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: [],
  reducers: {
    addRequest: (_, action) => {
      return action?.payload;
    },
    removeRequest: (state, action) => {
      const newArr = state?.filter((req: any) => req?._id !== action?.payload);
      return newArr;
    },
  },
});

export default requestSlice.reducer;
export const { addRequest, removeRequest } = requestSlice.actions;
