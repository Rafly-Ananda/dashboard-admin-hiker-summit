import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Destination } from "../../interfaces";

interface DestinationsState {
  destinations: Destination[] | null;
  isDestinationsFetching: boolean;
  destinationsFetchError: boolean;
}

const initialState: DestinationsState = {
  destinations: null,
  isDestinationsFetching: false,
  destinationsFetchError: false,
};

export const destinationsSlice = createSlice({
  name: "destinations",
  initialState,
  reducers: {
    destinationsActionsStart: (state) => {
      state.isDestinationsFetching = true;
      state.destinationsFetchError = false;
    },
    destinationsActionsFailure: (state) => {
      state.isDestinationsFetching = false;
      state.destinationsFetchError = true;
    },
    // ? change below method to fetchdestinationsuccess later
    fetchdestinationsuccess: (
      state,
      action: PayloadAction<Array<Destination>>
    ) => {
      state.destinations = action.payload;
    },
    // TODO: this reducer is only for deleting images
    modifyDestination: (
      state,
      action: PayloadAction<{ key: string; destinationId: string }>
    ) => {
      const { destinationId, key } = action.payload;
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === destinationId
      );
      if (targetDestination) {
        targetDestination.content.image_assets.assets_key =
          targetDestination.content.image_assets.assets_key.filter(
            (assetsKey) => assetsKey !== key
          );
      }
    },
  },
});

export const {
  destinationsActionsStart,
  destinationsActionsFailure,
  fetchdestinationsuccess,
  modifyDestination,
} = destinationsSlice.actions;
export default destinationsSlice.reducer;
