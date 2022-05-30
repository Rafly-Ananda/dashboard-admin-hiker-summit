import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Overview from "./pages/Overview";
import Tickets from "./pages/Tickets";
import Payment from "./pages/Payment";
import Users from "./pages/Users";
import Informations from "./pages/Informations";
import InformationsHome from "./components/Destination/InformationsHome";
import DestinationDetail from "./components/Destination/DestinationDetail";
import EditDestination from "./components/Destination/EditDestination";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import { useAppDispatch } from "./hooks/reduxHooks";
import { fetchDestinations, setUsers } from "./helpers/reduxApiCalls";
import { useEffect } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useAppSelector } from "./hooks/reduxHooks";

function App() {
  const axiosPrivate = useAxiosPrivate();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const { currentUser } = useAppSelector((state) => state.user);
  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    if (isMounted && currentUser?.is_admin) {
      setUsers(dispatch, axiosPrivate);
      fetchDestinations(dispatch);
    }

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [location]);

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
            <Route path="view/:id" element={<DestinationDetail />} />
            <Route path="edit/:id" element={<EditDestination />} />
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
