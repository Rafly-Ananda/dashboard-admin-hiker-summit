import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Book } from "../../interfaces";

interface BookingsState {
  bookings: Book[] | null;
}

const initialState: BookingsState = {
  bookings: null,
};

export const bookingsSlice = createSlice({
  name: "bookings",
  initialState,
  reducers: {
    fetchBookingSuccess: (state, action: PayloadAction<Array<Book>>) => {
      state.bookings = action.payload;
    },
  },
});

export const { fetchBookingSuccess } = bookingsSlice.actions;
export default bookingsSlice.reducer;
