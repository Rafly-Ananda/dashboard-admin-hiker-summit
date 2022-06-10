import React, { FC } from "react";
import { User, TicketsInterface } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { TransitionProps } from "@mui/material/transitions";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import Typography from "@mui/material/Typography";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector } from "../../hooks/reduxHooks";
import Button from "@mui/material/Button";
import { useParams } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Avatar from "@mui/material/Avatar";

interface ComponentProps {
  users: User[];
  tickets: TicketsInterface[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  setTickets: React.Dispatch<React.SetStateAction<TicketsInterface[]>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const TicketDetail: FC<ComponentProps> = ({
  users,
  tickets,
  openModal,
  setOpenModal,
  setTickets,
}) => {
  const axiosPrivate = useAxiosPrivate();
  const { id } = useParams();
  const navigate = useNavigate();
  const handleCloseModal = () => {
    setOpenModal(false);
    navigate(`/tickets`);
  };
  const { currentUser } = useAppSelector((state) => state.user);
  const { destinations } = useAppSelector(
    (state) => state.destinations.present
  );
  const ticket = tickets.find((ticket) => ticket._id === id);
  const user = users.find((user) => user._id === ticket?.user_id);

  const formatUser = (user: User): string => {
    let firstName, lastName;
    if (user) {
      firstName =
        user?.first_name[0]?.toUpperCase() + user?.first_name?.slice(1);
      lastName = user?.last_name[0]?.toUpperCase() + user?.last_name.slice(1);
    }
    return `${firstName} ${lastName}`;
  };

  const deleteTicketHandler = async (): Promise<void> => {
    try {
      await axiosPrivate.delete(
        `/api/v1/tickets/${ticket?._id}/users/${currentUser?._id}`
      );
      setTickets(tickets.filter((ticket) => ticket._id !== id));
      navigate("/tickets", { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const rejectHandler = async (): Promise<void> => {
    // ? id is the urlParams(), the implementation is we put whatever _id for the params so we can target the object
    try {
      await axiosPrivate.put(`/api/v1/guides/${id}/users/${currentUser?._id}`, {
        result: "rejected",
      });
      setTickets(tickets.filter((ticket) => ticket._id !== id));
      navigate("/tickets", { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  const approveHandler = async (): Promise<void> => {
    // ? id is the urlParams(), the implementation is we put whatever _id for the params so we can target the object
    try {
      await axiosPrivate.put(`/api/v1/guides/${id}/users/${currentUser?._id}`, {
        result: "approved",
      });
      setTickets(tickets.filter((ticket) => ticket._id !== id));
      navigate("/tickets", { replace: true });
    } catch (e) {
      if (e instanceof Error) {
        console.log(e.message);
      }
    }
  };

  return (
    <>
      {tickets && ticket && user && (
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
              {ticket.hasOwnProperty("location")
                ? "Destination Suggestion"
                : ticket.hasOwnProperty("hiking_experience")
                ? "Guide Proposal"
                : ticket.subject}
            </DialogTitle>
            <DialogContent>
              {ticket.subject ? (
                <>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Ticket Information
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
                  <Box>
                    <Typography variant="subtitle1" fontWeight={700}>
                      Details :
                    </Typography>
                    <Box p={1}>
                      <Typography variant="body1">{ticket.subject}</Typography>
                    </Box>
                  </Box>
                  <Box mt={5} display="flex" justifyContent="center">
                    <Box width="50%">
                      <Button
                        variant="contained"
                        color="error"
                        fullWidth
                        onClick={deleteTicketHandler}
                      >
                        Delete Ticket
                      </Button>
                    </Box>
                  </Box>
                </>
              ) : (
                <>
                  <Typography variant="subtitle1" fontWeight={700}>
                    Information Detail
                  </Typography>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle1" fontWeight={500}>
                      Name
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
                    <Typography variant="subtitle1" fontWeight={700}>
                      {destinations &&
                        destinations.find(
                          (destination) =>
                            destination._id === ticket.destination_id
                        )?.title}
                    </Typography>
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
                      {ticket.track_route}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle1" fontWeight={500}>
                      Experience
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {ticket.hiking_experience}
                    </Typography>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                  >
                    <Typography variant="subtitle1" fontWeight={500}>
                      Maximum Client per Trip
                    </Typography>
                    <Typography variant="subtitle1" fontWeight={700}>
                      {ticket.allowed_hiker_count}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography variant="subtitle1" fontWeight={500}>
                      About Me:
                    </Typography>
                    <Box p={2}>
                      <Typography variant="body1">{ticket.about_me}</Typography>
                    </Box>
                  </Box>
                  <Box
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    gap={4}
                  >
                    <Button
                      variant="contained"
                      color="error"
                      fullWidth
                      onClick={rejectHandler}
                    >
                      Reject
                    </Button>
                    <Button
                      variant="contained"
                      sx={{ backgroundColor: "#5de28b" }}
                      fullWidth
                      onClick={approveHandler}
                    >
                      Approve
                    </Button>
                  </Box>
                </>
              )}
            </DialogContent>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default TicketDetail;
