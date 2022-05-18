import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Overview from "./pages/Overview";
import Tickets from "./pages/Tickets";
import Payment from "./pages/Payment";
import Users from "./pages/Users";
import Informations from "./pages/Informations";
import Layout from "./components/Layout/Layout";
import Login from "./pages/Login";
import { useAppDispatch } from "./hooks/reduxHooks";
import { setDestinations } from "./helpers/reduxApiCalls";

function App() {
  const dispatch = useAppDispatch();
  setDestinations(dispatch);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Navigate to="/overview" replace />} />
          <Route path="overview" element={<Overview />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="payments" element={<Payment />} />
          <Route path="users" element={<Users />}>
            <Route path=":id" element={<Users />} />
          </Route>
          <Route path="informations" element={<Informations />} />
          <Route path="*" element={<Navigate to="/overview" replace />} />
        </Route>
      </Route>
      <Route path="login" element={<Login />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
