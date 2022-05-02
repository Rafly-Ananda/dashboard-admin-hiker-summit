import { FC, useEffect, useState } from "react";
import { User } from "../interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserTable from "../components/User/UserTable";
import UserEditForm from "../components/User/UserEditForm";

const Users: FC = () => {
  const axiosPrivate = useAxiosPrivate();
  const [users, setUsers] = useState<Array<User>>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    profile_picture: "",
    _id: "",
    email: "",
    username: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    destination_wishlist: [],
    user_status: "",
    is_admin: false,
    createdAt: "",
    updatedAt: "",
    accessToken: "",
  });

  const handelDeleteUser = async (userId: string): Promise<void> => {
    try {
      await axiosPrivate.delete(`api/v1/users/${userId}`);
      setUsers((prevUser) => prevUser.filter((user) => user._id != userId));
    } catch (e) {
      console.warn(e);
    }
  };

  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    e.preventDefault();
    try {
      await axiosPrivate.put(`/api/v1/users/${id}`, user);
      console.log("success");
      setUsers((prevUsers) => {
        // TODO : make a redux out of this
        const usersIndex = prevUsers.findIndex(
          (targetUser) => targetUser._id === user._id
        );
        prevUsers[usersIndex] = user;
        return prevUsers;
      });
      setOpenEditModal(false);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchUsers = async (): Promise<void> => {
      try {
        setIsFetching(true);
        const { data } = await axiosPrivate.get(`/api/v1/users`, {
          signal: controller.signal,
        });
        isMounted && setUsers(data.result.docs);
        setIsFetching(false);
      } catch (e) {
        console.warn(e);
      }
    };

    fetchUsers();

    // ? cleanup function useEffect
    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <>
      {openEditModal && (
        <UserEditForm
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          users={users}
          user={user}
          setUser={setUser}
          handleUpdateUser={handleUpdateUser}
        />
      )}
      <UserTable
        handleDeleteUser={handelDeleteUser}
        setOpenEditModal={setOpenEditModal}
        isFetching={isFetching}
        users={users}
      />
    </>
  );
};

export default Users;
