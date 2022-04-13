import { Routes, Route, Navigate } from "react-router-dom";
import "./scss/app.scss";
import Sidebar from "./components/ActionBar/Sidebar";
import Overview from "./pages/Overview";
import Tickets from "./pages/Tickets";
import Payment from "./pages/Payment";
import Users from "./pages/Users";
import Information from "./pages/Information";
import TitleBar from "./components/ActionBar/TitleBar";
import Authentication from "./pages/Authentication";

function App() {
  return (
    <div className="app">
      <Sidebar />
      <main>
        <div className="main_top">
          <TitleBar />
        </div>
        <div className="main_bottom">
          <Routes>
            <Route path="/" element={<Navigate to="/overview" />} />
            <Route path="/overview" element={<Overview />} />
            <Route path="/tickets" element={<Tickets />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/users/*" element={<Users />} />
            <Route path="/information" element={<Information />} />
            <Route path="/login" element={<Authentication />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
