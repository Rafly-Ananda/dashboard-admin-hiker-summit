import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Destination } from "../../interfaces";

interface UserState {
  destinations: Destination[] | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: UserState = {
  destinations: null,
  isFetching: false,
  error: false,
};

export const destinationsSlice = createSlice({
  name: "destination",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    fetchFail: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    fetchSuccess: (state, action: PayloadAction<Array<Destination>>) => {
      state.isFetching = false;
      state.destinations = action.payload;
    },
  },
});

export const { fetchStart, fetchFail, fetchSuccess } =
  destinationsSlice.actions;

export default destinationsSlice.reducer;
