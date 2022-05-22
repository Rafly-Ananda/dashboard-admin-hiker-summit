import { FC } from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { Link } from "react-router-dom";
import { Destination } from "../../interfaces";

interface ComponentProps {
  destination: Destination;
}

const InformationRow: FC<ComponentProps> = ({ destination }) => {
  return (
    <TableRow sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
      <TableCell component="th" scope="row" sx={{ paddingLeft: 5 }}>
        <Typography fontWeight={600} variant="subtitle1">
          Gunung{" "}
          {destination.title[0].toUpperCase() + destination.title.slice(1)}
        </Typography>
      </TableCell>
      <TableCell align="right" sx={{ paddingRight: 8 }}>
        <Link
          to={`/informations/${destination._id}`}
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
  );
};

export default InformationRow;
