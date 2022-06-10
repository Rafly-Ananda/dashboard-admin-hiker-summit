import { FC } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Destination, DestinationRules } from "../../../interfaces";

interface ComponentProps {
  destination: Destination;
}

const RulesRow: FC<ComponentProps> = ({ destination }) => {
  return (
    <>
      {destination &&
        Object.entries(destination.content.rules).map((e) => (
          <Box key={e[0]}>
            <Typography fontWeight="bold" variant="subtitle1">
              {e[0][0].toUpperCase() + e[0].slice(1)}
            </Typography>
            <TableContainer sx={{ padding: 1 }}>
              <Table size="small">
                <TableBody>
                  {Object.values(e[1]).map((point, index) => (
                    <TableRow
                      key={(point as keyof DestinationRules) + index}
                      sx={{
                        td: { border: 0 },
                      }}
                    >
                      <TableCell width={1}>{index + 1}.</TableCell>
                      <TableCell align="left">
                        <Typography variant="body2">
                          {point as keyof DestinationRules}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        ))}
    </>
  );
};

export default RulesRow;
