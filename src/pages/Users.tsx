import { FC, useEffect, useState } from "react";
import { User, Destination } from "../interfaces";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import UserTable from "../components/User/UserTable";
import UserEditForm from "../components/User/UserEditForm";
import { axiosPublic } from "../api/axiosInstance";
import { setUsers } from "../helpers/reduxApiCalls";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";

const Users: FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { users } = useAppSelector((state) => state.users);
  // const [users, setUsers] = useState<Array<User>>([]);
  const [destinations, setDestinations] = useState();
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [openEditModal, setOpenEditModal] = useState<boolean>(false);
  const [user, setUser] = useState<User>({
    image_assets: {
      bucket: "",
      assets_key: "",
    },
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
    verified: false,
  });

  const handelDeleteUser = async (userId: string): Promise<void> => {
    // TODO: because now we're using redux, need to filter the redux state
    // try {
    //   await axiosPrivate.delete(`api/v1/users/${userId}`);
    //   setUsers((prevUser) => prevUser.filter((user) => user._id != userId));
    // } catch (e) {
    //   console.warn(e);
    // }
  };

  const handleUpdateUser = async (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => {
    // TODO: because now we're using redux, need to update in redux state
    // e.preventDefault();
    // try {
    //   await axiosPrivate.put(`/api/v1/users/${id}`, user);
    //   setUsers((prevUsers) => {
    //     // TODO : make a redux out of this
    //     const usersIndex = prevUsers.findIndex(
    //       (targetUser) => targetUser._id === user._id
    //     );
    //     prevUsers[usersIndex] = user;
    //     return prevUsers;
    //   });
    //   setOpenEditModal(false);
    // } catch (e) {
    //   console.warn(e);
    // }
  };

  // useEffect(() => {
  //   let isMounted = true;
  //   const controller = new AbortController();

  //   const fetchUsers = async (): Promise<void> => {
  //     try {
  //       setIsFetching(true);
  //       const { data } = await axiosPrivate.get(`/api/v1/users`, {
  //         signal: controller.signal,
  //       });

  //       if (isMounted) {
  //         setUsers(data.result.docs);
  //         setIsFetching(false);
  //       }
  //     } catch (e) {
  //       if (e instanceof Error) {
  //         if (e.message === "canceled") {
  //           return;
  //         } else {
  //           console.error(e);
  //         }
  //       }
  //     }
  //   };

  //   // TODO: NEED TO REDUX THIS
  //   const getDestination = async (): Promise<void> => {
  //     try {
  //       const { data } = await axiosPublic.get(`api/v1/destinations/`, {
  //         signal: controller.signal,
  //       });

  //       isMounted && setDestinations(data.result.docs);
  //     } catch (e) {
  //       console.warn(e);
  //     }
  //   };

  //   getDestination();
  //   fetchUsers();

  //   // ? cleanup function useEffect
  //   return () => {
  //     isMounted = false;
  //     controller.abort();
  //   };
  // }, []);
  // TODO: this conditional rendering logic is weird, fix this plsz
  return (
    <>
      {openEditModal && users && (
        <UserEditForm
          openEditModal={openEditModal}
          setOpenEditModal={setOpenEditModal}
          users={users}
          user={user}
          setUser={setUser}
          handleUpdateUser={handleUpdateUser}
        />
      )}
      {users && (
        <UserTable
          handleDeleteUser={handelDeleteUser}
          setOpenEditModal={setOpenEditModal}
          isFetching={isFetching}
          users={users}
        />
      )}
    </>
  );
};

export default Users;
