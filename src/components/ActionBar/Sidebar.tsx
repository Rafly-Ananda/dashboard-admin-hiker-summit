import { FC } from "react";
import { Link } from "react-router-dom";
import styles from "./scss/sidebar.module.scss";
import axios from "axios";

const Sidebar: FC = () => {
  return (
    <nav>
      <div className={styles.top}>
        <Link to="/">
          <h3>Dashboard</h3>
        </Link>
      </div>

      <div className={styles.middle}>
        <Link to="/overview">Overview</Link>
        <Link to="/tickets">Tickets</Link>
        <Link to="/payment">Payment</Link>
        <Link to="/users">Users</Link>
        <Link to="/information">Information</Link>
      </div>

      <div className={styles.bottom}>
        <button
          onClick={() =>
            (async () => {
              try {
                const response = await axios.post("/api/v1/auth/logout");
                console.log(response);
              } catch (error) {
                console.error(error);
              }
            })()
          }
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Sidebar;
