import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  color: "#252733",
  borderRadius: theme.spacing(1),
}));

interface RowProps {
  title: string;
  result: number;
}

interface ComponentProps {
  navigateTo: string;
  title: string;
  rows: Array<RowProps>;
}

const GridTable: FC<ComponentProps> = ({ navigateTo, title, rows }) => {
  const navigate = useNavigate();
  return (
    <Item>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography variant="h6">{title}</Typography>
        <Link
          component="button"
          variant="body1"
          underline="none"
          sx={{
            height: "100%",
            fontWeight: "Medium",
            color: "#3751ff",
          }}
          onClick={() => navigate(`${navigateTo}`)}
        >
          Lihat selengkapnya
        </Link>
      </Box>
      <TableContainer>
        <Table aria-label="simple table">
          <TableBody>
            {rows.map((row, i) => (
              <TableRow
                key={i}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  <Typography>{row.title}</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography sx={{ fontWeight: "Bold", color: "#9fa2b4" }}>
                    {row.result}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Item>
  );
};

export default GridTable;
