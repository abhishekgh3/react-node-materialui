import { createSlice } from "@reduxjs/toolkit";

const initialState = { validParams: "", queryTrainingSet: [] };
const searchTraining = createSlice({
  name: "searchTraining",
  initialState,
  reducers: {
    addToQueryTrainingSet(state, action) {
      state.queryTrainingSet.push({ ...action.payload });
    },

    removeLastTrainingSetData(state) {
      state.queryTrainingSet.splice(-1);
    },

    assignValidParams(state, action) {
      state.validParams = action.payload;
    },
    clearTrainingData(state) {
      state.queryTrainingSet = [];
      state.validParams = "";
    },
  },
});

export const searchTrainingReducer = searchTraining.reducer;
export const searchTrainingActions = searchTraining.actions;
