import { FC } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

interface ComponentProps {
  destinationName: string;
}

const InformationRow: FC<ComponentProps> = ({ destinationName }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ paddingLeft: 5 }}>
        <Typography fontWeight={600} variant="subtitle1">
          Gunung {destinationName[0].toUpperCase() + destinationName.slice(1)}
        </Typography>
      </TableCell>
      <TableCell align="right" sx={{ paddingRight: 8 }}>
        <Link underline="none" href="#" variant="body2" color="#9fa2b4">
          View More
        </Link>
      </TableCell>
    </TableRow>
  );
};

export default InformationRow;
