import { createSlice } from "@reduxjs/toolkit";

const initialState = { isOpen: false, message: "", isError: false };
const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    openAlertWithAMessage(state, action) {
      state.message = action.payload;
      state.isOpen = true;
      state.isError = false;
    },
    closeAlert(state, action) {
      state.isOpen = false;
    },
    openErrorAlterWithMessage(state, action) {
      state.isOpen = true;
      state.message = action.payload;
      state.isError = true;
    },
  },
});

export const alertReducer = alertSlice.reducer;
export const alertActions = alertSlice.actions;
