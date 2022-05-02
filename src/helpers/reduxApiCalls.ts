import {
  actionStart,
  actionFailure,
  loginSuccess,
  logoutSuccess,
  setNewToken,
} from "../redux/slice/userSlice";
import { axiosPublic } from "../api/axiosInstance";

export const login = async (dispatch: any, user: object) => {
  dispatch(actionStart());
  try {
    const { data: loggedUser } = await axiosPublic.post(
      "/api/v1/auth/login",
      user
    );
    loggedUser.is_admin
      ? dispatch(loginSuccess(loggedUser))
      : dispatch(actionFailure());
  } catch (err) {
    dispatch(actionFailure());
  }
};

export const logout = async (dispatch: any) => {
  dispatch(actionStart());
  try {
    await axiosPublic.post("/api/v1/auth/logout");
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(actionFailure());
  }
};

export const setNewAccessToken = async (dispatch: any, token: string) => {
  dispatch(actionStart());
  try {
    dispatch(setNewToken(token));
  } catch (err) {
    dispatch(actionFailure());
  }
};
