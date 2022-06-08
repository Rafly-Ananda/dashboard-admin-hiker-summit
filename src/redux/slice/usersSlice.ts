import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Destination, User } from "../../interfaces";

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

    fetchUsersSuccess: (state, action: PayloadAction<Array<User>>) => {
      state.isUsersFetching = false;
      state.usersFetchError = false;
      state.users = action.payload;
    },

    modifiyUser: (
      state,
      action: PayloadAction<{ userId: string; content: any; key: string }>
    ) => {
      const targetUser = state.users?.find(
        (user) => user._id === action.payload.userId
      );
      if (targetUser) {
        (targetUser[action.payload.key as keyof User] as any) =
          action.payload.content;
      }
    },

    deleteUser: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      if (state.users) {
        state.users = state.users.filter((user) => user._id !== action.payload);
      }
    },
  },
});

export const { fetchUsersSuccess, deleteUser, modifiyUser } =
  usersSlice.actions;
export default usersSlice.reducer;
