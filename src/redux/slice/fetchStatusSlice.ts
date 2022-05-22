import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface fetchState {
  isFetching: boolean;
  error: boolean;
}

const initialState: fetchState = {
  isFetching: false,
  error: false,
};

export const fetchSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    fetchSuccess: (state) => {
      state.isFetching = false;
      state.error = false;
    },
    fetchFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
  },
});

export const { fetchStart, fetchSuccess, fetchFailure } = fetchSlice.actions;

export default fetchSlice.reducer;
