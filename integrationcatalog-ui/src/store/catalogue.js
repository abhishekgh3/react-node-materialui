import { createSlice } from "@reduxjs/toolkit";

const initialState = { filterQueryString: "", reloadItems: false };

const catalogueSlice = createSlice({
  name: "catalogue",
  initialState,
  reducers: {
    addFilterQueryString(state, action) {
      state.filterQueryString = action.payload;
    },
    setReloadCatalogueItems(state, action) {
      state.reloadItems = action.payload;
    },
  },
});

export const catalogueReducer = catalogueSlice.reducer;
export const catalogueActions = catalogueSlice.actions;
