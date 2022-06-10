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
    acceptBooking: (state, action: PayloadAction<Book>) => {
      const targetBooking = state.bookings?.find(
        (booking) => booking._id === action.payload._id
      );

      if (targetBooking) {
        targetBooking.booking_status = "accepted";
        targetBooking.paid_status = "paid";
      }
    },
    declineBooking: (state, action: PayloadAction<Book>) => {
      const targetBooking = state.bookings?.find(
        (booking) => booking._id === action.payload._id
      );

      if (targetBooking) {
        targetBooking.booking_status = "declined";
        targetBooking.paid_status = "unpaid";
      }
    },
  },
});

export const { fetchBookingSuccess, acceptBooking, declineBooking } =
  bookingsSlice.actions;
export default bookingsSlice.reducer;
