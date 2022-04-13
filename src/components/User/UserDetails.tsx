import { FC, useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./scss/userDetails.module.scss";
import axios from "axios";
import { BASE_URL } from "../../config";
import { User } from "../../interfaces";

const UserDetails: FC = () => {
  const { id } = useParams();
  const [user, setUser] = useState<User>();

  // TODO : user redux here to store token later
  const fetchUsers = async () => {
    const { data } = await axios.get(`${BASE_URL}/users/${id}`, {
      headers: {
        Token:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyMzgzNjZlMDlkOWFhZjA3OWJkNzNjZSIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2NDk2MTIyOTIsImV4cCI6MTY0OTg3MTQ5Mn0.T-1jq1u3nQmbUCLgs22WIX_gGWhqS36I1xnTSS20nWQ",
      },
    });
    setUser(data.result);
  };

  const handleEdit = async (id: string) => {
    console.log("edit");
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const formatDate = (date: any) => {
    const baseDate = new Date(date);
    const formattedDate = baseDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <ul>
          <li>_id : {id}</li>
          <li>Username : {user?.username}</li>
          <li>Email : {user?.email}</li>
          <li>First Name : {user?.first_name}</li>
          <li>Last Name : {user?.last_name}</li>
          <li>Phone Number : {user?.phone_number}</li>
          <li>Admin : {user?.is_admin ? "True" : "False"}</li>
          <li>Created At : {formatDate(user?.createdAt)}</li>
          <li>Updated At : {formatDate(user?.updatedAt)}</li>
          <li>
            Destination Wishlist :
            {user?.destination_wishlist && user?.destination_wishlist.length > 0
              ? user?.destination_wishlist
              : " -"}
          </li>

          <li className={styles.last__li}>
            <button
              onClick={() => {
                handleEdit(id as string); // ? force type
              }}
            >
              Edit User
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserDetails;
