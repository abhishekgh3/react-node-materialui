import { createSlice, current } from "@reduxjs/toolkit";

const dialogSlice = createSlice({
  name: "dialog",
  initialState: {
    showDialog: false,
    editCatalogueItem: {},
    newCatalogueItem: {},
    title: "",
    isEdit: false,
    showDeleteConfirmation: false,
    deleteId: "",
  },
  reducers: {
    showNewDialog(state) {
      state.showDialog = true;
      state.isEdit = false;
      state.title = "Create New Item";
    },

    showEditDialog(state) {
      state.showDialog = true;
      state.isEdit = true;
      state.title = "Edit Item";
    },

    hideDialog(state) {
      state.newCatalogueItem = {};
      state.showDialog = false;
    },

    showDeleteConfirmation(state, action) {
      state.showDeleteConfirmation = true;
    },

    addDeleteId(state, action) {
      state.deleteId = action.payload;
    },

    hideDeletConfirmation(state) {
      state.showDeleteConfirmation = false;
    },

    createEditCatalogueItem(state, action) {
      state.editCatalogueItem = action.payload;
    },

    addToCatalogueItem(state, action) {
      if (state.isEdit) {
        state.editCatalogueItem[action.payload.name] = action.payload.value;
      } else {
        state.newCatalogueItem[action.payload.name] = action.payload.value;
      }
    },
    removeKeyFromCatalogueItem(state, action) {
      if (state.isEdit) {
        delete state.editCatalogueItem[action.payload.name];
      } else {
        delete state.newCatalogueItem[action.payload.name];
      }
    },
  },
});

export const dialogReducer = dialogSlice.reducer;
export const dialogActions = dialogSlice.actions;
