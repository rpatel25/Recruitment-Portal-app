import { createSlice } from "@reduxjs/toolkit";
import { initialFilterState } from "./data";

const initialState = initialFilterState;

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setJobFilters: (state, action) => {
      return { ...state, ...action.payload };
    },
  },
});

export const { setJobFilters } = filterSlice.actions;

export default filterSlice.reducer;
