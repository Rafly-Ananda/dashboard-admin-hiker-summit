import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";

interface UserState {
  isLoggedIn: boolean;
  currentUser: User | null;
}

const initialState: UserState = {
  isLoggedIn: false,
  currentUser: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<object>) => {
      state.currentUser = action.payload as User;
      state.isLoggedIn = true;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.currentUser = null;
    },
    setNewToken: (state, action: PayloadAction<string>) => {
      state.currentUser!.accessToken = action.payload;
    },
  },
});

export const { loginSuccess, logoutSuccess, setNewToken } = userSlice.actions;
export default userSlice.reducer;
