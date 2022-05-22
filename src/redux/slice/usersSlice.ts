import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../interfaces";

interface UsersState {
  users: User[] | null;
  isUsersFetching: boolean;
  usersFetchError: boolean;
}

const initialState: UsersState = {
  users: null,
  isUsersFetching: false,
  usersFetchError: false,
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersFetchStart: (state) => {
      state.isUsersFetching = true;
      state.usersFetchError = false;
    },
    usersFetchFailure: (state) => {
      state.isUsersFetching = false;
      state.usersFetchError = true;
    },
    // ? change below method to fetchusersuccess later
    fetchUsers: (state, action: PayloadAction<Array<User>>) => {
      state.isUsersFetching = false;
      state.usersFetchError = false;
      state.users = action.payload;
    },
    // TODO: this is not finished
    modifiyUser: (state, action: PayloadAction<User>) => {
      const targetUser = state.users?.find(
        (user) => user._id === action.payload._id
      );
      console.log(`the targeted user is ${targetUser}`);
    },
  },
});

export const { fetchUsers } = usersSlice.actions;
export default usersSlice.reducer;
