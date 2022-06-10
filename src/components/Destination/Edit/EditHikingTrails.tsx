import { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Destination } from "../../../interfaces";
import {
  addLocationTrack,
  removeLocationTrack,
  addAccessibilityField,
  removeAccessibilityField,
  editAccessibilityContent,
  editDestinationLocationTrackObject,
} from "../../../redux/slice/destinationsSlice";

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
            boxShadow: 3,
            borderRadius: "20px",
            mb: 5,
            p: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={1}
            mb={3}
          >
            <Typography
              variant="h6"
              component="p"
              fontWeight="bold"
              sx={{
                textDecoration: "underline",
              }}
            >
              Track {index + 1}
            </Typography>
          </Box>

          <TextField
            id="track_name"
            name="track_name"
            label="Track Name"
            type="text"
            maxRows={5}
            defaultValue={track.track_name}
            onBlur={(e) =>
              dispatch(
                editDestinationLocationTrackObject({
                  destination: destination,
                  trackKey: index,
                  key: e.target.name,
                  content: e.target.value,
                })
              )
            }
            multiline
            variant="outlined"
          />

          <TextField
            id="basecamp_name"
            name="basecamp_name"
            label="Basecamp Name"
            type="text"
            maxRows={5}
            defaultValue={track.basecamp_name}
            sx={{ ml: 2 }}
            onBlur={(e) =>
              dispatch(
                editDestinationLocationTrackObject({
                  destination: destination,
                  trackKey: index,
                  key: e.target.name,
                  content: e.target.value,
                })
              )
            }
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
            onBlur={(e) =>
              dispatch(
                editDestinationLocationTrackObject({
                  destination: destination,
                  trackKey: index,
                  key: e.target.name,
                  content: e.target.value,
                })
              )
            }
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
                onBlur={(e) =>
                  dispatch(
                    editDestinationLocationTrackObject({
                      destination: destination,
                      trackKey: index,
                      key: e.target.name,
                      content: e.target.value,
                    })
                  )
                }
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
                onBlur={(e) =>
                  dispatch(
                    editDestinationLocationTrackObject({
                      destination: destination,
                      trackKey: index,
                      key: e.target.name,
                      content: e.target.value,
                    })
                  )
                }
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
                onBlur={(e) =>
                  dispatch(
                    editDestinationLocationTrackObject({
                      destination: destination,
                      trackKey: index,
                      key: e.target.name,
                      content: e.target.value,
                    })
                  )
                }
                multiline
                variant="outlined"
              />
            </Box>
            <Box display="flex" flexDirection="column">
              <TextField
                margin="normal"
                id="road_name"
                name="road_name"
                label="Road Name"
                type="text"
                maxRows={5}
                defaultValue={track.road_name}
                onBlur={(e) =>
                  dispatch(
                    editDestinationLocationTrackObject({
                      destination: destination,
                      trackKey: index,
                      key: e.target.name,
                      content: e.target.value,
                    })
                  )
                }
                multiline
                variant="outlined"
              />
              <TextField
                margin="normal"
                id="postal_code"
                name="postal_code"
                label="Postal Code"
                variant="outlined"
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                defaultValue={track.postal_code}
                onBlur={(e) =>
                  dispatch(
                    editDestinationLocationTrackObject({
                      destination: destination,
                      trackKey: index,
                      key: e.target.name,
                      content: Number(e.target.value),
                    })
                  )
                }
              />
              <TextField
                margin="normal"
                id="phone_number"
                name="phone_number"
                label="Phone Number"
                variant="outlined"
                type="number"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                defaultValue={track.phone_number}
                onBlur={(e) =>
                  dispatch(
                    editDestinationLocationTrackObject({
                      destination: destination,
                      trackKey: index,
                      key: e.target.name,
                      content: Number(e.target.value),
                    })
                  )
                }
              />
            </Box>
          </Box>

          {track &&
            track.accessibility &&
            Object.entries(track.accessibility).map((e, i) => (
              <TextField
                key={e[1] + i}
                margin="normal"
                label={`Accessibility ${i + 1}`}
                type="text"
                maxRows={5}
                defaultValue={e[1]}
                onBlur={(element) =>
                  dispatch(
                    editAccessibilityContent({
                      destination: destination,
                      trackKey: index,
                      content: element.target.value,
                      field: e[0],
                    })
                  )
                }
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
              sx={{ textTransform: "none", mr: 2, width: "5vw" }}
              disabled={
                Object.entries(destination.location.track[index].accessibility)
                  .length < 2
                  ? true
                  : false
              }
              onClick={() => {
                dispatch(
                  removeAccessibilityField({
                    destination: destination,
                    trackKey: index,
                  })
                );
              }}
            >
              Remove
            </Button>
            <Button
              variant="contained"
              color="primary"
              size="medium"
              sx={{ textTransform: "none", mr: 2, width: "5vw" }}
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
      <Box mb={2} display="flex" justifyContent="center">
        <Button
          variant="contained"
          color="error"
          size="medium"
          sx={{ textTransform: "none", mr: 2, width: "10vw" }}
          disabled={destination.location.track.length < 2 ? true : false}
          onClick={() =>
            dispatch(
              removeLocationTrack({
                destination: destination,
              })
            )
          }
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
