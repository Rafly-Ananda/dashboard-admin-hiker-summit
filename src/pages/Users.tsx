import { FC, useEffect, useState } from "react";
import axios from "axios";
import styles from "./scss/users.module.scss";
import { User } from "../interfaces";
import { Navigate, Route, Routes } from "react-router-dom";
import UserDetails from "../components/User/UserDetails";
import UserTable from "../components/User/UserTable";
import Spinner from "../components/Spinner/Spinner";

interface ComponentProps {
  fetchUsers: () => string;
}

const Users: FC = () => {
  const [users, setUsers] = useState<Array<User>>([]);
  const [loading, setLoading] = useState<Boolean>(false);
  const [error, setError] = useState<Boolean>(false);

  const fetchUsers = async (): Promise<void> => {
    try {
      const response = await axios.get(`api/v1/users`, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTQ0NTVlMjJlYjUwNjUwMzY2MzQzZCIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2NDk4NjU0NDIsImV4cCI6MTY0OTg2OTA0Mn0.9c30kDK0P4zBGoUeiKjT44VjjY2ijCN8vAvLLMbMVsQ",
        },
      });

      setUsers(response.data.result.docs);
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (userId: string): Promise<void> => {
    setLoading(true);
    try {
      await axios.delete(`api/v1/users/${userId}`, {
        headers: {
          token:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTQ0NTVlMjJlYjUwNjUwMzY2MzQzZCIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2NDk4NjU0NDIsImV4cCI6MTY0OTg2OTA0Mn0.9c30kDK0P4zBGoUeiKjT44VjjY2ijCN8vAvLLMbMVsQ",
        },
      });
      setLoading(false);
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className={styles.page__wrapper}>
      {loading ? (
        <div className={styles.loading}>
          <Spinner />
        </div>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<UserTable data={users} deleteUser={deleteUser} />}
          />
          <Route path="/:id" element={<UserDetails />} />
          <Route path="*" element={<Navigate to={"/users"} />} />
        </Routes>
      )}
    </div>
  );
};

export default Users;
