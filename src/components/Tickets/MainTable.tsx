import React, { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { User, TicketsInterface } from "../../interfaces";

interface ComponentProps {
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  tickets: TicketsInterface[];
  users: User[];
}

const MainTable: FC<ComponentProps> = ({ tickets, users, setOpenModal }) => {
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [page, setPage] = useState<number>(0);
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
    let firstName, lastName;

    const user = users?.find((user) => user._id === id);
    if (user) {
      firstName =
        user?.first_name[0]?.toUpperCase() + user?.first_name?.slice(1);
      lastName = user?.last_name[0]?.toUpperCase() + user?.last_name.slice(1);
    }
    return `${firstName} ${lastName}`;
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const emptyRows =
    page > 0 ? Math.max(0, page * rowsPerPage - users.length) : 0;

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
          All Tickets
        </Typography>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left" width={"40%"}>
                <Typography variant="body2" fontWeight="bold" color="#9fa2b4">
                  Ticket details
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" fontWeight="bold" color="#9fa2b4">
                  Customer name
                </Typography>
              </TableCell>
              <TableCell align="left">
                <Typography variant="body2" fontWeight="bold" color="#9fa2b4">
                  Date
                </Typography>
              </TableCell>
              <TableCell width={"15%"}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {(rowsPerPage > 0
              ? tickets.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : tickets
            ).map((ticket, i) => (
              <TableRow
                key={i}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display="flex" alignItems="center" gap={2}>
                    <Avatar
                      alt={
                        users.find((user) => user._id === ticket.user_id)
                          ?.username
                      }
                      src={
                        users.find((user) => user._id === ticket.user_id)
                          ?.image_assets.assets_key
                          ? `api/v1/assets?bucket=${
                              users.find((user) => user._id === ticket.user_id)
                                ?.image_assets.bucket
                            }&key=${
                              users.find((user) => user._id === ticket.user_id)
                                ?.image_assets.assets_key
                            }`
                          : "#"
                      }
                      sx={{ width: 40, height: 40 }}
                    />
                    <Typography>
                      {ticket.hasOwnProperty("location")
                        ? "Destination Suggestion"
                        : ticket.hasOwnProperty("hiking_experience")
                        ? "Guide Proposal"
                        : ticket.subject}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="left">{getUser(ticket.user_id)}</TableCell>
                <TableCell align="left">
                  {formatDate(ticket.createdAt)}
                </TableCell>
                <TableCell align="left">
                  <Button
                    size="small"
                    sx={{ textTransform: "none", color: "#9fa2b4" }}
                    onClick={() => {
                      if (ticket.hasOwnProperty("location")) {
                        navigate(`/informations/view/${ticket._id}`);
                      } else {
                        setOpenModal(true);
                        navigate(`/tickets/${ticket._id}`);
                      }
                    }}
                  >
                    View More
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={5} />
              </TableRow>
            )}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10]}
                labelRowsPerPage={<span>Rows Per Page : </span>}
                count={tickets.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                showFirstButton={true}
                showLastButton={true}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default MainTable;
