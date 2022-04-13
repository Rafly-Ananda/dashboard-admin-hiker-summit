import { FC } from "react";
import { User } from "../../interfaces";
import styles from "./scss/userCard.module.scss";
import { Link } from "react-router-dom";

interface UserProps {
  data: User;
}

const UserCard: FC<UserProps> = (props) => {
  return (
    <div className={styles.container}>
      <ul>
        <Link to={`/users/find/${props.data?._id}`}>
          <li>_id : {props.data?._id}</li>
          <li>Username : {props.data?.username}</li>
          <li>Email : {props.data?.email}</li>
        </Link>
      </ul>
    </div>
  );
};

export default UserCard;
