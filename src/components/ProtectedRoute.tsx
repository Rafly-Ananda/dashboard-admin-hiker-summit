import { FC } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const ProtectedRoute: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const location = useLocation();

  return currentUser?.is_admin ? (
    <Outlet />
  ) : (
    <Navigate to={"/login"} state={{ from: location }} replace />
  );
};

export default ProtectedRoute;
