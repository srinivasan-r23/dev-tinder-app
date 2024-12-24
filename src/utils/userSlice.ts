import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: null,
    reducers: {
        addUser: (_, action) => {
            return action.payload;
        },
        removeUser: (_) => {
            return  null;
        }
    }
})

export const { addUser, removeUser } = userSlice.actions;
export default userSlice.reducer;