import { useState } from "react";
import MainTable from "../components/Payment/MainTable";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import PaymentDetail from "../components/Payment/PaymentDetail";

const Payment = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { bookings } = useAppSelector((state) => state.bookings);
  const { users } = useAppSelector((state) => state.users);
  const { destinations } = useAppSelector(
    (state) => state.destinations.present
  );
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <>
      {destinations && bookings && users && openModal && (
        <PaymentDetail
          bookings={bookings}
          users={users}
          destinations={destinations}
          openModal={openModal}
          setOpenModal={setOpenModal}
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
