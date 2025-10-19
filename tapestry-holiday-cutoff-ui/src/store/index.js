import { configureStore } from "@reduxjs/toolkit";
import { alertReducer } from "./alert";
import { dialogReducer } from "./dialog";
import { menuReducer } from "./side-menu";

const store = configureStore({
  reducer: {
    menu: menuReducer,
    alert: alertReducer,
    dialog: dialogReducer,
  },
});

export default store;
