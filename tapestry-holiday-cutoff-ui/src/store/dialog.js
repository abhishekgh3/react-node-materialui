import { createSlice } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    showConfirmation: false,
    message: "",
    confirmation: false,
    url: "",
    type: "",
    sucess: false,
  },
  reducers: {
    showConfirmation(state, action) {
      state.showConfirmation = true;
      state.message = action.payload.message;
      state.type = action.payload.type;
      state.url = action.payload.url;
    },

    addId(state, action) {
      state.id = action.payload;
    },

    hideConfirmation(state) {
      state.showConfirmation = false;
      state.confirmation = false;
    },

    handleConfirmation(state) {
      state.confirmation = true;
    },

    handleSucess(state) {
      state.sucess = true;
    },

    resetStatus(state) {
      state.sucess = false;
    },
  },
});

export const dialogReducer = dialogSlice.reducer;
export const dialogActions = dialogSlice.actions;
