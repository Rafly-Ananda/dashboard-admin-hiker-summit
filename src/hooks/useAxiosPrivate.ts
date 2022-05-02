import { axiosPrivate } from "../api/axiosInstance";
import { useEffect } from "react";
import { useAppSelector } from "./reduxHooks";
import useRefreshToken from "./useRefreshToken";

const useAxiosPrivate = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const refresh = useRefreshToken();

  // ? !prevRequest?.sent this is to prevent endless loop where we kept retrying the request after it fails the first time, this is a custom property that we made

  // ? we utilize cleanup function of use effect to remove axios interceptors if not removed manually it can pile on

  useEffect(() => {
    const requestInterceptors = axiosPrivate.interceptors.request.use(
      (config) => {
        if (config.headers === undefined) config.headers = {};
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${user?.accessToken}`;
        }
        return config;
      },
      (e) => {
        return Promise.reject(e);
      }
    );

    const responseInterceptors = axiosPrivate.interceptors.response.use(
      (response) => {
        return response;
      },
      async (e) => {
        // ? accessToken expired
        const prevRequest = e?.config;
        if (e?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccessToken = await refresh();
          prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(e);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseInterceptors);
      axiosPrivate.interceptors.request.eject(requestInterceptors);
    };
  }, [user, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
