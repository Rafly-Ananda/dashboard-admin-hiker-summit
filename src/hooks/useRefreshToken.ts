import { axiosPublic } from "../api/axiosInstance";
import { setNewAccessToken } from "../helpers/reduxApiCalls";
import { useAppDispatch } from "./reduxHooks";
import { useNavigate, useLocation } from "react-router-dom";
import { logout } from "../helpers/reduxApiCalls";

interface RefreshResponse {
  accessToken: string;
}

const useRefreshToken = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const refresh = async () => {
    try {
      const { data }: { data: RefreshResponse } = await axiosPublic.post(
        "/api/v1/auth/token"
      );
      setNewAccessToken(dispatch, data.accessToken);
      return data.accessToken;
    } catch (error) {
      alert("Need To Login Again.");
      logout(dispatch);
      navigate("/login", { state: { from: location }, replace: true });
    }
  };
  return refresh;
};

export default useRefreshToken;
