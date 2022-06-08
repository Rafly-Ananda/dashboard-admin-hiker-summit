import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Book, User } from "../../interfaces";

interface ComponentProps {
  bookings: Book[];
  users: User[];
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainTable: FC<ComponentProps> = ({
  bookings,
  users,
  openModal,
  setOpenModal,
}) => {
  const navigate = useNavigate();

  const formatDate = (date: Date): string => {
    const baseDate = new Date(date);
    const formattedDate = baseDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  const getUser = (id: string): string => {
    const user = users?.find((user) => user._id === id);
    let firstName, lastName;
    if (user) {
      firstName =
        user?.first_name[0]?.toUpperCase() + user?.first_name?.slice(1);
      lastName = user?.last_name[0]?.toUpperCase() + user?.last_name.slice(1);
    }
    return `${firstName} ${lastName}`;
  };

  return (
    <Container
      maxWidth="xl"
      sx={{
        mt: 5,
        p: 5,
      }}
    >
      <TableContainer
        sx={{
          padding: 2,
          borderRadius: 3,
          backgroundColor: "#fff",
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h5"
          component="h2"
          sx={{ m: 2, fontWeight: "bold" }}
        >
          All Payments
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={"55%"}>
                <Typography variant="body2" fontWeight="bold" color="#9fa2b4">
                  Customer Name
                </Typography>
              </TableCell>
              <TableCell align="left" width={"15%"}>
                <Typography variant="body2" fontWeight="bold" color="#9fa2b4">
                  Date
                </Typography>
              </TableCell>
              <TableCell align="left" width={"15%"}>
                <Typography variant="body2" fontWeight="bold" color="#9fa2b4">
                  Status
                </Typography>
              </TableCell>
              <TableCell align="left" width={"15%"}>
                <Typography variant="body2" fontWeight="bold" color="#9fa2b4">
                  Action
                </Typography>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings.map((book) => (
              <TableRow
                key={book._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell align="left">
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      alt={
                        users.find((user) => user._id === book.user_id)
                          ?.username
                      }
                      src={
                        users.find((user) => user._id === book.user_id)
                          ?.image_assets.assets_key
                          ? `api/v1/assets?bucket=${
                              users.find((user) => user._id === book.user_id)
                                ?.image_assets.bucket
                            }&key=${
                              users.find((user) => user._id === book.user_id)
                                ?.image_assets.assets_key
                            }`
                          : "#"
                      }
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography>{getUser(book.user_id)}</Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">{formatDate(book.createdAt)}</TableCell>
                <TableCell align="left">
                  <Typography
                    fontWeight={600}
                    variant="subtitle1"
                    color="#fff"
                    sx={{
                      backgroundColor:
                        book.paid_status === "paid" ? "#5de28b" : "#fec400",
                      textAlign: "center",
                      width: "7vw",
                      borderRadius: 5,
                    }}
                  >
                    {book.paid_status}
                  </Typography>
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    sx={{ textTransform: "none", color: "#9fa2b4" }}
                    onClick={() => {
                      setOpenModal(true);
                      navigate(`/payments/${book._id}`);
                    }}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MainTable;
