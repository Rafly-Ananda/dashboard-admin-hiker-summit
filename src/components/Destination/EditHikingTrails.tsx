import { FC } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Destination } from "../../interfaces";
import {
  addLocationTrack,
  addAccessibilityField,
} from "../../redux/slice/destinationsSlice";

interface ComponentProps {
  destination: Destination;
  dispatch: any;
}

const EditHikingTrails: FC<ComponentProps> = ({ destination, dispatch }) => {
  return (
    <Box>
      {Object.values(destination.location.track).map((track, index) => (
        <Box
          key={destination._id + track + index}
          sx={{
            border: "2px solid #212121",
            borderRadius: "20px",
            mt: 2,
            p: 3,
          }}
        >
          <TextField
            id="track_name"
            name="track_name"
            label="Track Name"
            type="text"
            maxRows={5}
            defaultValue={track.track_name}
            // onBlur={(e) =>
            //   dispatch(
            //     editRulesContent({
            //       destination: destination,
            //       key: i as unknown as string,
            //       content: e.target.value,
            //       field: e[0],
            //     })
            //   )
            // }

            multiline
            variant="outlined"
          />

          <TextField
            margin="normal"
            id="description"
            name="description"
            label="description"
            type="text"
            maxRows={5}
            defaultValue={track.description}
            // onBlur={(e) =>
            //   dispatch(
            //     editRulesContent({
            //       destination: destination,
            //       key: i as unknown as string,
            //       content: e.target.value,
            //       field: e[0],
            //     })
            //   )
            // }
            fullWidth
            multiline
            variant="outlined"
          />

          <Box display="flex">
            <Box display="flex" flexDirection="column" mr={2}>
              <TextField
                margin="normal"
                id="village"
                name="village"
                label="Village"
                type="text"
                maxRows={5}
                defaultValue={track.village}
                // onBlur={(e) =>
                //   dispatch(
                //     editRulesContent({
                //       destination: destination,
                //       key: i as unknown as string,
                //       content: e.target.value,
                //       field: e[0],
                //     })
                //   )
                // }

                multiline
                variant="outlined"
              />
              <TextField
                margin="normal"
                id="district"
                name="district"
                label="District"
                type="text"
                maxRows={5}
                defaultValue={track.district}
                // onBlur={(e) =>
                //   dispatch(
                //     editRulesContent({
                //       destination: destination,
                //       key: i as unknown as string,
                //       content: e.target.value,
                //       field: e[0],
                //     })
                //   )
                // }

                multiline
                variant="outlined"
              />
              <TextField
                margin="normal"
                id="ward"
                name="ward"
                label="Ward"
                type="text"
                maxRows={5}
                defaultValue={track.ward}
                // onBlur={(e) =>
                //   dispatch(
                //     editRulesContent({
                //       destination: destination,
                //       key: i as unknown as string,
                //       content: e.target.value,
                //       field: e[0],
                //     })
                //   )
                // }

                multiline
                variant="outlined"
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <TextField
                margin="normal"
                id="postal_code"
                name="postal_code"
                label="Postal Code"
                type="text"
                maxRows={5}
                defaultValue={track.postal_code}
                // onBlur={(e) =>
                //   dispatch(
                //     editRulesContent({
                //       destination: destination,
                //       key: i as unknown as string,
                //       content: e.target.value,
                //       field: e[0],
                //     })
                //   )
                // }

                multiline
                variant="outlined"
              />
              <TextField
                margin="normal"
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                type="text"
                maxRows={5}
                defaultValue={track.phone_number}
                // onBlur={(e) =>
                //   dispatch(
                //     editRulesContent({
                //       destination: destination,
                //       key: i as unknown as string,
                //       content: e.target.value,
                //       field: e[0],
                //     })
                //   )
                // }

                multiline
                variant="outlined"
              />
            </Box>
          </Box>

          {Object.entries(track.accessibility).map((e, i) => (
            <TextField
              key={e[1] + i}
              margin="normal"
              label={`Accessibility ${i + 1}`}
              type="text"
              maxRows={5}
              defaultValue={e[1]}
              //  onBlur={(e) =>
              //    dispatch(
              //      editRulesContent({
              //        destination: destination,
              //        key: i as unknown as string,
              //        content: e.target.value,
              //        field: e[0],
              //      })
              //    )
              //  }
              fullWidth
              multiline
              variant="outlined"
            />
          ))}

          <Box mt={2} mb={2}>
            <Button
              variant="contained"
              color="error"
              size="medium"
              sx={{ textTransform: "none", mr: 2, width: "10vw" }}
              // onClick={() =>
              //   dispatch(
              //     removeRulesField({
              //       destination: destination,
              //       field: e[0],
              //     })
              //   )
              // }
            >
              Remove
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ textTransform: "none", mr: 2, width: "10vw" }}
              onClick={() =>
                dispatch(
                  addAccessibilityField({
                    destination: destination,
                    trackKey: index,
                  })
                )
              }
            >
              Add
            </Button>
          </Box>

          {/* <TableRow
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
          </TableRow> */}
        </Box>
      ))}
      <Box mt={2} mb={2} ml={3}>
        <Button
          variant="contained"
          color="error"
          size="medium"
          sx={{ textTransform: "none", mr: 2, width: "10vw" }}
          // onClick={() =>
          //   dispatch(
          //     removeRulesField({
          //       destination: destination,
          //       field: e[0],
          //     })
          //   )
          // }
        >
          Remove Track
        </Button>
        <Button
          variant="contained"
          color="primary"
          size="medium"
          sx={{ textTransform: "none", mr: 2, width: "10vw" }}
          onClick={() =>
            dispatch(
              addLocationTrack({
                destination: destination,
              })
            )
          }
        >
          Add Track
        </Button>
      </Box>
    </Box>
  );
};

export default EditHikingTrails;
