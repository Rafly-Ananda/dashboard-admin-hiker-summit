import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";

interface UserState {
  isLoggedIn: boolean;
  currentUser: User | null;
  isFetching: boolean;
  error: boolean;
}

const initialState: UserState = {
  isLoggedIn: false,
  currentUser: null,
  isFetching: false,
  error: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    actionStart: (state) => {
      state.isFetching = true;
      state.error = false;
    },
    actionFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    loginSuccess: (state, action: PayloadAction<object>) => {
      state.currentUser = action.payload as User;
      state.isLoggedIn = true;
      state.isFetching = false;
    },
    logoutSuccess: (state) => {
      state.isFetching = false;
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    setNewToken: (state, action: PayloadAction<any>) => {
      state.isFetching = false;
      state.currentUser!.accessToken = action.payload;
    },
    removeToken: (state) => {
      state.isFetching = false;
      state.currentUser!.accessToken = "";
    },
  },
});

export const {
  actionStart,
  actionFailure,
  loginSuccess,
  logoutSuccess,
  setNewToken,
} = userSlice.actions;

export default userSlice.reducer;
