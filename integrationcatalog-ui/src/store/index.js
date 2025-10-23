import { configureStore } from "@reduxjs/toolkit";
import { dialogReducer } from "./dialog";
import { drawerReducer } from "./drawer";
import { advancedFilterReducer } from "./adavanced-filter";
import { catalogueReducer } from "./catalogue";
import { alertReducer } from "./alert";
import { searchTrainingReducer } from "./search-training";

const store = configureStore({
  reducer: {
    dialog: dialogReducer,
    drawer: drawerReducer,
    advancedFilter: advancedFilterReducer,
    catalogue: catalogueReducer,
    alert: alertReducer,
    searchTraining: searchTrainingReducer,
  },
});

export default store;
