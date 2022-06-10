import React, { FC } from "react";
import { Book, User, Destination } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { useParams } from "react-router-dom";

interface ComponentProps {
  bookings: Book[];
  users: User[];
  destinations: Destination[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  approveHandler: (booking: Book) => void;
  declinceHandler: (booking: Book) => void;
}

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

const Image = styled("img")(({ theme }) => ({
  display: "block",
  width: "10vw",
}));

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const PaymentDetail: FC<ComponentProps> = ({
  bookings,
  users,
  destinations,
  openModal,
  setOpenModal,
  approveHandler,
  declinceHandler,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setOpenModal(false);
    navigate("/payments");
  };

  const formatDate = (date: string): string => {
    const baseDate = new Date(date);
    const formattedDate = baseDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  const formatUser = (user: User): string => {
    let firstName, lastName;
    if (user) {
      firstName =
        user?.first_name[0]?.toUpperCase() + user?.first_name?.slice(1);
      lastName = user?.last_name[0]?.toUpperCase() + user?.last_name.slice(1);
    }
    return `${firstName} ${lastName}`;
  };

  const booking = bookings.find((book) => book._id === id);
  const user = users.find((user) => user._id === booking?.user_id);

  return (
    <>
      {booking && user && (
        <Box>
          <Dialog
            fullWidth
            maxWidth="sm"
            open={openModal}
            onClose={handleCloseModal}
            TransitionComponent={Transition}
            keepMounted
          >
            <DialogTitle sx={{ mt: 1 }} fontWeight={700}>
              Guide Booking
            </DialogTitle>
            <DialogContent>
              <Typography variant="subtitle1" fontWeight={700}>
                Detailed Information
              </Typography>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  Customer Name
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  {formatUser(user)}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  Destination
                </Typography>
                <Box>
                  <Typography variant="subtitle1" fontWeight={700}>
                    {"Gunung " +
                      destinations.find(
                        (destination) =>
                          destination._id === booking.destination_id
                      )?.title}
                  </Typography>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  Track Route
                </Typography>

                <Typography variant="subtitle1" fontWeight={700}>
                  {"Track " + booking.track_route[0].track_name}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  Hiking Duration
                </Typography>

                <Typography variant="subtitle1" fontWeight={700}>
                  {`${formatDate(booking.date.departure)} - ${formatDate(
                    booking.date.arrival
                  )}`}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  Hiker Count
                </Typography>
                <Typography variant="subtitle1" fontWeight={700}>
                  {booking.hiker_count}
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  Note:
                </Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                p={1}
              >
                <Typography variant="body1">{booking.note}</Typography>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
              >
                <Typography variant="subtitle1" fontWeight={500}>
                  Total Price
                </Typography>
                <Typography
                  variant="subtitle1"
                  fontWeight={700}
                  color="#ff9800"
                >
                  {"Rp. " + booking.payment_amount}
                </Typography>
              </Box>
              <Box>
                <Typography variant="subtitle1" fontWeight={500}>
                  Payment Proof
                </Typography>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  border="2px solid #9fa2b4"
                  borderRadius={2}
                  boxShadow={1}
                  mt={2}
                >
                  <ImageContainer>
                    {booking.proof_of_payment.assets_key ? (
                      <Image
                        src={
                          booking.proof_of_payment.assets_key
                            ? `/api/v1/assets?bucket=${booking.proof_of_payment.bucket}&key=${booking.proof_of_payment.assets_key}`
                            : "#"
                        }
                        srcSet={
                          booking.proof_of_payment.assets_key
                            ? `/api/v1/assets?bucket=${booking.proof_of_payment.bucket}&key=${booking.proof_of_payment.assets_key}`
                            : "#"
                        }
                        alt={booking.proof_of_payment.assets_key}
                        loading="lazy"
                      />
                    ) : (
                      <Typography variant="body1">Not Available</Typography>
                    )}
                  </ImageContainer>
                </Box>
              </Box>
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mt={4}
              >
                {booking.booking_status === "canceled" ? (
                  <Typography>Booking Canceled By Customer.</Typography>
                ) : (
                  <>
                    {booking.guide_id.length < 1 ? (
                      <Typography>
                        No Guide Has Accepted The Booking.
                      </Typography>
                    ) : (
                      <Box
                        display="flex"
                        alignItems="center"
                        justifyContent="center"
                        gap={4}
                        width="80%"
                      >
                        <Button
                          variant="contained"
                          color="error"
                          fullWidth
                          onClick={() => declinceHandler(booking)}
                        >
                          Decline
                        </Button>
                        <Button
                          variant="contained"
                          sx={{ backgroundColor: "#5de28b" }}
                          fullWidth
                          onClick={() => approveHandler(booking)}
                        >
                          Approve
                        </Button>
                      </Box>
                    )}
                  </>
                )}
              </Box>
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default PaymentDetail;
