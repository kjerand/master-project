import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface AdminState {
  admin: boolean;
  userID: string;
}

const initialState: AdminState = {
  admin: false,
  userID: "",
};

export const adminSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.admin = action.payload;
    },
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin, setUserID } = adminSlice.actions;

export default adminSlice.reducer;
