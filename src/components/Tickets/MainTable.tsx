import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";

const MainTable = ({ guides, users }) => {
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
    const firstName =
      user?.first_name[0]?.toUpperCase() + user?.first_name?.slice(1);
    const lastName =
      user?.last_name[0]?.toUpperCase() + user?.last_name.slice(1);
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
            {guides.map((guide: any) => (
              <TableRow
                key={guide._id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {"this is detail"}
                </TableCell>
                <TableCell align="left">{getUser(guide.user_id)}</TableCell>
                <TableCell align="left">
                  {formatDate(guide.createdAt)}
                </TableCell>
                <TableCell align="left">
                  <Link
                    to={`/tickets`}
                    style={{
                      color: "#9fa2b4",
                      textDecoration: "none",
                      marginRight: "0.25em",
                    }}
                  >
                    View More
                  </Link>
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
