import { createSlice } from "@reduxjs/toolkit";

const connectionSlice = createSlice({
  name: "connection",
  initialState: [],
  reducers: {
    addConnections: (_, action) => {
      return action?.payload;
    },
    removeConnection: (_, action) => {
      return action?.payload;
    },
  },
});

export const { addConnections, removeConnection } = connectionSlice?.actions;
export default connectionSlice.reducer;
