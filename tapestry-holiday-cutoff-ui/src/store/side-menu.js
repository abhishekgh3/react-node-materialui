import { createSlice, current } from "@reduxjs/toolkit";

const initialState = { showMenu: false, showComponent: "" };

const menuSlice = createSlice({
  name: "menu",
  initialState,
  reducers: {
    showMenu(state) {
      state.showMenu = true;
      console.log(current(state));
    },
    hideMenu(state) {
      state.showMenu = false;
      console.log(current(state));
    },
    showComponent(state, action) {
      state.showComponent = action.payload;
    },
  },
});

export const menuReducer = menuSlice.reducer;
export const menuActions = menuSlice.actions;
