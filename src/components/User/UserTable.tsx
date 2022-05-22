import { FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import UserRow from "./UserRow";
import Spinner from "../Spinner/Spinner";
import { User } from "../../interfaces";

interface ComponentProps {
  handleDeleteUser: (id: string) => void;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  isFetching: boolean;
  users: Array<User>;
}

const UserTable: FC<ComponentProps> = ({
  handleDeleteUser,
  setOpenEditModal,
  isFetching,
  users,
}) => {
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);

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
    <>
      {isFetching ? (
        <Box
          sx={{
            position: "relative",
            height: "92%",
          }}
        >
          <Spinner />
        </Box>
      ) : (
        <Container
          maxWidth="xl"
          sx={{
            mt: rowsPerPage === 5 ? 5 : 0,
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
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "5%" }} />
                  <TableCell sx={{ width: "19%" }}>Username</TableCell>
                  <TableCell sx={{ width: "19%" }}>Email</TableCell>
                  <TableCell sx={{ width: "19%" }}>Is Admin</TableCell>
                  <TableCell sx={{ width: "19%" }}>User Status</TableCell>
                  <TableCell sx={{ width: "19%" }}>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {(rowsPerPage > 0
                  ? users.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                  : users
                ).map((user) => (
                  <UserRow
                    key={user._id}
                    user={user}
                    handleDeleteUser={handleDeleteUser}
                    setOpenEditModal={setOpenEditModal}
                  />
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows }}>
                    <TableCell colSpan={5} />
                  </TableRow>
                )}
              </TableBody>
              <TableFooter
                style={{
                  border: "none",
                }}
              >
                <TableRow>
                  <TablePagination
                    rowsPerPageOptions={[5, 10]}
                    labelRowsPerPage={<span>Rows Per Page : </span>}
                    count={users.length}
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
      )}
    </>
  );
};

export default UserTable;
