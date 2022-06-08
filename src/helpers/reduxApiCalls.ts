import {
  loginSuccess,
  logoutSuccess,
  setNewToken,
} from "../redux/slice/userSlice";
import { fetchUsersSuccess, deleteUser } from "../redux/slice/usersSlice";
import {
  destinationsActionsStart,
  destinationsActionsFailure,
  fetchdestinationsuccess,
  removeDestinationImage,
} from "../redux/slice/destinationsSlice";
import {
  fetchStart,
  fetchSuccess,
  fetchFailure,
} from "../redux/slice/fetchStatusSlice";
import { fetchBookingSuccess } from "../redux/slice/BookingsSlice";
import { axiosPublic } from "../api/axiosInstance";
import { Destination, User } from "../interfaces";

export const login = async (dispatch: any, user: object): Promise<void> => {
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

export const logout = async (dispatch: any): Promise<void> => {
  dispatch(fetchStart());
  try {
    await axiosPublic.post("/api/v1/auth/logout");
    dispatch(logoutSuccess());
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchFailure());
  }
};

export const setNewAccessToken = async (
  dispatch: any,
  token: string
): Promise<void> => {
  dispatch(fetchStart());
  try {
    dispatch(setNewToken(token));
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchFailure());
  }
};

export const fetchDestinations = async (dispatch: any): Promise<void> => {
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

export const deleteDestinationImage = async (
  dispatch: any,
  axiosPrivate: any,
  key: string,
  destination: Destination,
  user: User
): Promise<void> => {
  dispatch(destinationsActionsStart());
  const destinationForm = new FormData();
  destinationForm.append("document", JSON.stringify(destination));
  try {
    const destinationId = destination._id;
    const deleteImageS3 = axiosPublic.delete(
      `/api/v1/assets?key=${key}&bucket=${destination.content.image_assets.bucket}`
    );
    const modifyDestinationAssetsRecord = axiosPrivate.put(
      `/api/v1/destinations/${destinationId}/users/${user._id}`,
      destinationForm
    );
    await Promise.allSettled([deleteImageS3, modifyDestinationAssetsRecord]);
    dispatch(removeDestinationImage({ key, destinationId }));
  } catch (err) {
    dispatch(destinationsActionsFailure());
  }
};

export const submitDestinationEditChanges = async (
  dispatch: any,
  axiosPrivate: any,
  navigate: any,
  destination: Destination,
  user: User
): Promise<void> => {
  const destinationForm = new FormData();
  destinationForm.append("document", JSON.stringify(destination));
  try {
    await axiosPrivate.put(
      `/api/v1/destinations/${destination._id}/users/${user._id}`,
      destinationForm
    );
    navigate(`/informations/view/${destination._id}`, { replace: true });
  } catch (err) {
    dispatch(destinationsActionsFailure());
  }
};

export const removeDestination = async (
  dispatch: any,
  axiosPrivate: any,
  navigate: any,
  destination: Destination
): Promise<void> => {
  const destinationForm = new FormData();
  destinationForm.append("document", JSON.stringify(destination));
  try {
    await axiosPrivate.delete(`/api/v1/destinations/${destination._id}`);
    navigate(`/informations`, { replace: true });
  } catch (err) {
    dispatch(destinationsActionsFailure());
  }
};

export const fetchUsers = async (
  dispatch: any,
  axiosPrivate: any
): Promise<void> => {
  dispatch(fetchStart());
  try {
    const {
      data: { result },
    } = await axiosPrivate.get(`api/v1/users/`);
    dispatch(fetchUsersSuccess(result.docs));
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchStart());
  }
};

export const submitUserEditChanges = async (
  dispatch: any,
  axiosPrivate: any,
  user: User
): Promise<void> => {
  dispatch(fetchStart());

  try {
    await await axiosPrivate.put(`/api/v1/users/${user._id}`, user);
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(destinationsActionsFailure());
  }
};

export const removeUser = async (
  dispatch: any,
  axiosPrivate: any,
  userId: string
): Promise<void> => {
  dispatch(fetchStart());
  try {
    await axiosPrivate.delete(`api/v1/users/${userId}`);
    dispatch(deleteUser(userId));
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchStart());
  }
};

export const fetchBookings = async (
  dispatch: any,
  axiosPrivate: any
): Promise<void> => {
  dispatch(fetchStart());
  try {
    const {
      data: { result },
    } = await axiosPrivate.get(`api/v1/bookings?newest=true`);
    dispatch(fetchBookingSuccess(result.docs));
    dispatch(fetchSuccess());
  } catch (err) {
    dispatch(fetchStart());
  }
};
