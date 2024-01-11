

import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./sliderSlice";

const store = configureStore({
  reducer: {
    slider: sliderReducer,
    // ... other reducers if any
  },
});


export default store;
