

import { configureStore } from "@reduxjs/toolkit";
import sliderReducer from "./sliderSlice";
// import authReducer from "./auth-slice";
const store = configureStore({
  reducer: {
    slider: sliderReducer,
    // auth: authReducer,
    // ... other reducers if any
  },
});


export default store;
