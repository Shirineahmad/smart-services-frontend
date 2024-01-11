// sliderSlice.js

import { createSlice } from "@reduxjs/toolkit";

const sliderSlice = createSlice({
  name: "slider",
  initialState: {
    value: 0,
    servicesList: [],
  },
  reducers: {
    setValue: (state, action) => {
      if (state.servicesList.length === 0) return;

      const newValue = action.payload(state.value, state.servicesList.length);
      state.value = newValue;
    },
    
    setServicesList: (state, action) => {
      state.servicesList = action.payload;
    },
  },
});

export const { setValue, setServicesList } = sliderSlice.actions;
export default sliderSlice.reducer;
