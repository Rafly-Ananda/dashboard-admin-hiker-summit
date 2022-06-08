import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import { Destination } from "../../interfaces";
import Typography from "@mui/material/Typography";

interface ComponentProps {
  destination: Destination;
}

const HikingTrailsTable: FC<ComponentProps> = ({ destination }) => {
  return (
    <TableContainer>
      {Object.values(destination.location.track).map((track, index) => (
        <Table
          key={destination._id + track + index}
          sx={{ marginBottom: "3vh" }}
        >
          <TableBody>
            <TableRow
              sx={{
                td: { border: 0 },
                m: 2,
              }}
            >
              <TableCell sx={{ p: 1 }}>Track Name</TableCell>
              <TableCell sx={{ pl: 1, width: "93%" }} align="left">
                <Typography variant="body2" fontWeight="bold" ml={1}>
                  {track.track_name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                td: { border: 0 },
                m: 2,
              }}
            >
              <TableCell sx={{ p: 1 }}>Basecamp</TableCell>
              <TableCell sx={{ pl: 1, width: "93%" }} align="left">
                <Typography variant="body2" fontWeight="bold" ml={1}>
                  {track.basecamp_name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                td: { border: 0 },
                m: 2,
              }}
            >
              <TableCell sx={{ p: 1 }}>Road</TableCell>
              <TableCell sx={{ pl: 1, width: "93%" }} align="left">
                <Typography variant="body2" fontWeight="bold" ml={1}>
                  {track.road_name}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                td: { border: 0 },
              }}
            >
              <TableCell sx={{ p: 1, verticalAlign: "top" }}>
                Description
              </TableCell>
              <TableCell sx={{ p: 1, width: "93%" }} align="left">
                <Typography variant="body2" fontWeight="bold" ml={1}>
                  {track.description}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                td: { border: 0 },
              }}
            >
              <TableCell sx={{ p: 1, verticalAlign: "top" }}>Address</TableCell>
              <TableCell sx={{ p: 1, width: "93%" }} align="left">
                <Typography variant="body2" fontWeight="bold" ml={1}>
                  {`Desa ${track.village}, Kecamatan ${track.district}, Kabupaten ${track.ward}, ${destination.location.province}, ${track.postal_code}`}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                td: { border: 0 },
              }}
            >
              <TableCell sx={{ p: 1, verticalAlign: "top" }}>Contact</TableCell>
              <TableCell sx={{ p: 1, width: "93%" }} align="left">
                <Typography variant="body2" fontWeight="bold" ml={1}>
                  {track.phone_number}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                td: { border: 0 },
              }}
            >
              <TableCell sx={{ p: 1, verticalAlign: "top" }}>
                Accessibility
              </TableCell>
              <TableCell sx={{ p: 0 }}>
                {track.accessibility &&
                  Object.values(track.accessibility).map((point, index) => (
                    <Table key={destination._id + point + index}>
                      <TableBody>
                        <TableRow>
                          <TableCell sx={{ p: 1, width: "93%" }} align="left">
                            <Typography
                              variant="body2"
                              fontWeight="bold"
                              ml={1}
                            >
                              {point}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  ))}
              </TableCell>
            </TableRow>
            <TableRow
              sx={{
                td: { border: 0 },
              }}
            >
              <TableCell sx={{ p: 1, verticalAlign: "top" }}>Image</TableCell>
              <TableCell sx={{ p: 1, width: "93%" }} align="left">
                <Typography variant="body2" ml={1}>
                  undefined
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </TableContainer>
  );
};

export default HikingTrailsTable;
