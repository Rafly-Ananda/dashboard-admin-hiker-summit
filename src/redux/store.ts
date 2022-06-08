import {
  configureStore,
  ThunkAction,
  Action,
  combineReducers,
} from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import userReducer from "./slice/userSlice";
import usersReducer from "./slice/usersSlice";
import DestinationReducer from "./slice/destinationsSlice";
import FetchStatusReducer from "./slice/fetchStatusSlice";
import BookingsReducer from "./slice/BookingsSlice";
import undoable from "redux-undo";

const rootReducer = combineReducers({
  user: userReducer,
  destinations: undoable(DestinationReducer),
  users: usersReducer,
  fetch: FetchStatusReducer,
  bookings: BookingsReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  blacklist: ["destinations", "users", "fetch", "bookings"],
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
