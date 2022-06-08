import { FC, useState } from "react";
import { User, Destination } from "../interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserTable from "../components/User/UserTable";
import UserEditForm from "../components/User/UserEditForm";
import { removeUser, submitUserEditChanges } from "../helpers/reduxApiCalls";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { users } = useAppSelector((state) => state.users);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);

  const handelDeleteUser = (userId: string): void => {
    removeUser(dispatch, axiosPrivate, userId);
  };

  const handleUpdateUser = (
    e: React.FormEvent<HTMLFormElement>,
    user: User
  ): void => {
    e.preventDefault();
    try {
      submitUserEditChanges(dispatch, axiosPrivate, user);
      setOpenEditModal(false);
    } catch (e) {
      console.warn(e);
    }
  };

  return (
    <>
      {users && (
        <UserTable
          handleDeleteUser={handelDeleteUser}
          setOpenEditModal={setOpenEditModal}
          users={users}
        />
      )}
      {users && openEditModal && (
        <UserEditForm
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          handleUpdateUser={handleUpdateUser}
        />
      )}
    </>
  );
};

export default Users;
