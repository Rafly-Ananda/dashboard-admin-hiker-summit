import { useState } from "react";
import MainTable from "../components/Payment/MainTable";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PaymentDetail from "../components/Payment/PaymentDetail";
import {
  acceptBookingRequest,
  declineBookingRequest,
} from "../helpers/reduxApiCalls";
import { Book } from "../interfaces";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { bookings } = useAppSelector((state) => state.bookings);
  const { users } = useAppSelector((state) => state.users);
  const { destinations } = useAppSelector(
    (state) => state.destinations.present
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  const approveHandler = (booking: Book): void => {
    acceptBookingRequest(dispatch, axiosPrivate, navigate, booking);
  };

  const declinceHandler = (booking: Book): void => {
    declineBookingRequest(dispatch, axiosPrivate, navigate, booking);
  };

  return (
    <>
      {destinations && bookings && users && openModal && (
        <PaymentDetail
          bookings={bookings}
          users={users}
          destinations={destinations}
          openModal={openModal}
          setOpenModal={setOpenModal}
          approveHandler={approveHandler}
          declinceHandler={declinceHandler}
        />
      )}
      {bookings && users && (
        <MainTable
          bookings={bookings}
          users={users}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      )}
    </>
  );
};

export default Payment;
