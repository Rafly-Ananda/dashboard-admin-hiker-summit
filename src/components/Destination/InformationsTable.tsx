import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useAppSelector } from "../../hooks/reduxHooks";
import InformationRow from "./InformationRow";

interface ComponentProps {
  tableTitle: string;
}

const InformationsTable: FC<ComponentProps> = ({ tableTitle }) => {
  const { destinations } = useAppSelector((state) => state.destinations);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const filteredDestination = destinations?.filter(
    (destination) => destination.location.island === tableTitle
  );
  const datasetLength = filteredDestination?.length as number;
  const emptyRows =
    page > 0 ? Math.max(0, page * rowsPerPage - datasetLength) : 0;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleDeleteUser = (id: string): Promise<void> => {
  //   try {
  //     await axiosPrivate.delete(`api/v1/users/${userId}`);
  //     setUsers((prevUser) => prevUser.filter((user) => user._id != userId));
  //   } catch (e) {
  //     console.warn(e);
  //   }
  // }

  return (
    <>
      {
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
              Pulau {tableTitle[0].toUpperCase() + tableTitle.slice(1)}
            </Typography>
            {filteredDestination && filteredDestination.length > 0 ? (
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ paddingLeft: 5 }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight={800}
                        color="#9fa2b4"
                      >
                        Destination Name
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        paddingRight: 10,
                      }}
                    >
                      <Typography fontWeight={800} color="#9fa2b4">
                        Action
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {(filteredDestination && rowsPerPage > 0
                    ? filteredDestination.slice(
                        page * rowsPerPage,
                        page * rowsPerPage + rowsPerPage
                      )
                    : filteredDestination
                  )?.map((destination) => (
                    <InformationRow
                      key={destination._id}
                      destination={destination}
                    />
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
                      count={filteredDestination?.length as number}
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
            ) : (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  m: 9,
                }}
              >
                <Typography variant="h5" fontWeight={700} color="#9fa2b4">
                  No Information
                </Typography>
              </Box>
            )}
          </TableContainer>
        </Container>
      }
    </>
  );
};

export default InformationsTable;
