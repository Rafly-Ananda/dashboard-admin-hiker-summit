import {
  loginSuccess,
  logoutSuccess,
  setNewToken,
} from "../redux/slice/userSlice";
import { fetchUsers } from "../redux/slice/usersSlice";
import {
  destinationsActionsStart,
  destinationsActionsFailure,
  fetchdestinationsuccess,
  modifyDestination,
} from "../redux/slice/destinationsSlice";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "../redux/slice/fetchStatusSlice";
import { axiosPublic } from "../api/axiosInstance";
import { Destination } from "../interfaces";

export const login = async (dispatch: any, user: object) => {
  dispatch(fetchStart());
  try {
    const { data: loggedUser } = await axiosPublic.post(
      "/api/v1/auth/login",
      user
    );

    if (loggedUser.is_admin) {
      dispatch(loginSuccess(loggedUser));
      dispatch(fetchSuccess());
    } else {
      dispatch(fetchFailure());
    }
  } catch (err) {
    dispatch(fetchFailure());
  }
};

export const logout = async (dispatch: any) => {
  dispatch(fetchStart());
  try {
    await axiosPublic.post("/api/v1/auth/logout");
    dispatch(logoutSuccess());
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchFailure());
  }
};

export const setNewAccessToken = async (dispatch: any, token: string) => {
  dispatch(fetchStart());
  try {
    dispatch(setNewToken(token));
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchFailure());
  }
};

export const fetchDestinations = async (dispatch: any) => {
  dispatch(destinationsActionsStart());
  try {
    const {
      data: { result },
    } = await axiosPublic.get(`api/v1/destinations/`);
    dispatch(fetchdestinationsuccess(result.docs));
  } catch (err) {
    dispatch(destinationsActionsFailure());
  }
};

// TODO: make this redux call to only delete image, for now this only delete the image from s3 but not the assets key inside the assets_key array, better make a purger action in backend OR just make a update route only for this usage that is deleting and updating images array
export const editDestination = async (
  dispatch: any,
  key: string,
  destination: Destination
) => {
  dispatch(destinationsActionsStart());

  // ! dont hard code the bucket key soo bad practice man

  try {
    const destinationId = destination._id;
    // await axiosPublic.delete(
    //   `/api/v1/assets?key=${key}&bucket=destination_assets`
    // );
    // await axiosPublic.patch()
    dispatch(modifyDestination({ key, destinationId }));
  } catch (err) {
    dispatch(destinationsActionsFailure());
  }
};

export const setUsers = async (dispatch: any, axiosPrivate: any) => {
  dispatch(fetchStart());
  try {
    const {
      data: { result },
    } = await axiosPrivate.get(`api/v1/users/`);
    dispatch(fetchUsers(result.docs));
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchStart());
  }
};
