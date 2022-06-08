import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Destination,
  DestinationRules,
  DestinationLocation,
  DestinationTrack,
} from "../../interfaces";

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

    fetchdestinationsuccess: (
      state,
      action: PayloadAction<Array<Destination>>
    ) => {
      state.destinations = action.payload;
    },

    // TODO: work on these
    addDestinationImage: (
      state,
      action: PayloadAction<{ key: string; destinationId: string }>
    ) => {
      // const { destinationId, key } = action.payload;
      // const targetDestination = state.destinations?.find(
      //   (dest) => dest._id === destinationId
      // );
      // if (targetDestination) {
      //   targetDestination.content.image_assets.assets_key =
      //     targetDestination.content.image_assets.assets_key.filter(
      //       (assetsKey) => assetsKey !== key
      //     );
      // }
    },

    removeDestinationImage: (
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

    editDestinationKeyObject: (
      state,
      action: PayloadAction<{
        destination: Destination;
        content: any;
        key: string;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        (targetDestination[action.payload.key as keyof Destination] as any) =
          action.payload.content;
      }
    },

    editDestinationLocationKeyObject: (
      state,
      action: PayloadAction<{
        destination: Destination;
        content: any;
        key: string;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.location[
          action.payload.key as keyof DestinationLocation
        ] = action.payload.content;
      }
    },

    editDestinationLocationTrackObject: (
      state,
      action: PayloadAction<{
        destination: Destination;
        trackKey: number;
        key: string;
        content: any;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        (targetDestination.location.track[action.payload.trackKey][
          action.payload.key as keyof DestinationTrack
        ] as any) = action.payload.content;
      }
    },

    editDestinationGeneralInformation: (
      state,
      action: PayloadAction<{
        destination: Destination;
        content: string;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.content.general_information = action.payload.content;
      }
    },

    editRulesContent: (
      state,
      action: PayloadAction<{
        destination: Destination;
        key: string;
        content: string;
        field: string;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.content.rules[
          action.payload.field as keyof DestinationRules
        ][action.payload.key] = action.payload.content;
      }
    },

    editAccessibilityContent: (
      state,
      action: PayloadAction<{
        destination: Destination;
        trackKey: number;
        content: string;
        field: string;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.location.track[action.payload.trackKey].accessibility[
          action.payload.field
        ] = action.payload.content;
      }
    },

    addLocationTrack: (
      state,
      action: PayloadAction<{
        destination: Destination;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.location.track = [
          ...targetDestination.location.track,
          {
            description: "",
            accessibility: { 1: "" },
            track_name: "",
            basecamp_name: "",
            road_name: "",
            district: "",
            ward: "",
            village: "",
            postal_code: 0,
            phone_number: 0,
          },
        ];
      }
    },

    removeLocationTrack: (
      state,
      action: PayloadAction<{
        destination: Destination;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.location.track.pop();
      }
    },

    addAccessibilityField: (
      state,
      action: PayloadAction<{
        destination: Destination;
        trackKey: number;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.location.track[
          action.payload.trackKey
        ].accessibility = {
          ...targetDestination.location.track[action.payload.trackKey]
            .accessibility,
          [String(
            Object.entries(
              targetDestination.location.track[action.payload.trackKey]
                .accessibility
            ).length + 1
          )]: "",
        };
      }
    },

    removeAccessibilityField: (
      state,
      action: PayloadAction<{
        destination: Destination;
        trackKey: number;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        delete targetDestination.location.track[action.payload.trackKey]
          .accessibility[
          String(
            Object.entries(
              targetDestination.location.track[action.payload.trackKey]
                .accessibility
            ).length
          )
        ];
      }
    },

    addRulesField: (
      state,
      action: PayloadAction<{
        destination: Destination;
        field: string;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );

      if (targetDestination) {
        targetDestination.content.rules[
          action.payload.field as keyof DestinationRules
        ] = {
          ...targetDestination?.content.rules[
            action.payload.field as keyof DestinationRules
          ],
          [String(
            Object.entries(
              targetDestination.content.rules[
                action.payload.field as keyof DestinationRules
              ]
            ).length + 1
          )]: "",
        };
      }
    },

    removeRulesField: (
      state,
      action: PayloadAction<{
        destination: Destination;
        field: string;
      }>
    ) => {
      const targetDestination = state.destinations?.find(
        (dest) => dest._id === action.payload.destination._id
      );
      if (targetDestination) {
        delete targetDestination.content.rules[
          action.payload.field as keyof DestinationRules
        ][
          String(
            Object.entries(
              targetDestination.content.rules[
                action.payload.field as keyof DestinationRules
              ]
            ).length
          )
        ];
      }
    },
  },
});

export const {
  destinationsActionsStart,
  destinationsActionsFailure,
  fetchdestinationsuccess,
  editDestinationKeyObject,
  editDestinationLocationKeyObject,
  editDestinationLocationTrackObject,
  editDestinationGeneralInformation,
  editRulesContent,
  editAccessibilityContent,
  addDestinationImage,
  addRulesField,
  addLocationTrack,
  addAccessibilityField,
  removeDestinationImage,
  removeLocationTrack,
  removeAccessibilityField,
  removeRulesField,
} = destinationsSlice.actions;
export default destinationsSlice.reducer;
