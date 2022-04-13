import { FC } from "react";
import styles from "./scss/userTable.module.scss";
import { Link } from "react-router-dom";
import { User } from "../../interfaces";
import Binocular from "../../assets/icons/Vector.svg";

interface ComponentProps {
  data: User[];
  deleteUser: (id: string) => void;
}

const UserTable: FC<ComponentProps> = ({ data, deleteUser }) => {
  return (
    <div className={styles.table_container}>
      <table className={styles.users_table}>
        <tbody>
          <tr className={styles.header_row}>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
          {data.map((ele: any) => (
            <tr key={ele._id}>
              <td>{ele.username}</td>
              <td>{ele.email}</td>
              <td>{ele.is_admin ? "Admin" : "Regular"}</td>
              <td>
                {
                  <div className={styles.action_container}>
                    <Link to={`/users/${ele._id}`}>
                      <img src={Binocular} placeholder="Binocular"></img>
                    </Link>
                    <button
                      onClick={() => {
                        deleteUser(ele._id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
