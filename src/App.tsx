import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Overview from "./pages/Overview";
import Tickets from "./pages/Tickets";
import Payment from "./pages/Payment";
import Users from "./pages/Users";
import Informations from "./pages/Informations";
import InformationsHome from "./components/Destination/InformationsHome";
import DestinationDetail from "./components/Destination/DestinationDetail";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useAppDispatch, useAppSelector } from "./hooks/reduxHooks";
import { fetchDestinations, setUsers } from "./helpers/reduxApiCalls";
import { useEffect } from "react";

function App() {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { currentUser, isLoggedIn } = useAppSelector((state) => state.user);
  fetchDestinations(dispatch);

  useEffect(() => {
    currentUser?.is_admin && isLoggedIn && setUsers(dispatch, axiosPrivate);
  }, []);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="payments" element={<Payment />} />
          <Route path="users" element={<Users />}>
            {/* this is a modal so just need to render the users again */}
            <Route path=":id" element={<Users />} />
          </Route>
          <Route path="informations" element={<Informations />}>
            <Route index element={<InformationsHome />} />
            <Route path=":id" element={<DestinationDetail />} />
          </Route>
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
