import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export interface AdminState {
  admin: boolean;
  userID: string;
}

const initialState: AdminState = {
  admin: false,
  userID: uuidv4(),
};

export const adminSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setAdmin: (state, action: PayloadAction<boolean>) => {
      state.admin = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setAdmin } = adminSlice.actions;

export default adminSlice.reducer;
