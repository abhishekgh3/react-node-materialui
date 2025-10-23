import { createSlice } from "@reduxjs/toolkit";

const initialState = { showDrawer: false };

const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer(state) {
      state.showDrawer = true;
    },
    hideDrawer(state) {
      state.showDrawer = false;
    },
  },
});

export const drawerReducer = drawerSlice.reducer;
export const drawerActions = drawerSlice.actions;
