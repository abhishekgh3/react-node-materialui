import { createSlice } from "@reduxjs/toolkit";

const initialState = { filterMenuSelectedItems: {} };

const advancedFilterSlice = createSlice({
  name: "advancedFilter",
  initialState,
  reducers: {
    addFilterParamValue(state, action) {
      if (!state.filterMenuSelectedItems[action.payload.name]) {
        state.filterMenuSelectedItems[action.payload.name] = new Array();
      }
      let values = state.filterMenuSelectedItems[action.payload.name];
      values.push(action.payload.value);
      state.filterMenuSelectedItems[action.payload.name] = values;
    },

    addOrReplaceParamValue(state, action) {
      state.filterMenuSelectedItems[action.payload.name] = new Array(
        action.payload.value
      );
    },

    removeFilterParamValue(state, action) {
      if (state.filterMenuSelectedItems[action.payload.name]) {
        let values = state.filterMenuSelectedItems[action.payload.name];
        values = values.filter((value) => value !== action.payload.value);
        state.filterMenuSelectedItems[action.payload.name] = values;
      }
    },

    removeFilterParamName(state, action) {
      if (state.filterMenuSelectedItems[action.payload.name]) {
        delete state.filterMenuSelectedItems[action.payload.name];
      }
    },

    resetfilterMenuItems(state) {
      state.filterMenuSelectedItems = {};
    },
  },
});

export const advancedFilterReducer = advancedFilterSlice.reducer;
export const advancedFilterActions = advancedFilterSlice.actions;
