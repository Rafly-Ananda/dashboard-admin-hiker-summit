import { FC, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppSelector } from "../../hooks/reduxHooks";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";

import { editDestination } from "../../helpers/reduxApiCalls";
import { useAppDispatch } from "../../hooks/reduxHooks";

import { Destination } from "../../interfaces";

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

const Image = styled("img")(({ theme }) => ({
  display: "block",
  width: "10vw",
}));

const DestinationDetail: FC = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();

  const selectedDestination = useAppSelector((state) =>
    state?.destinations?.destinations?.find(
      (destination) => destination._id === id
    )
  );

  const user = useAppSelector((state) =>
    state?.users?.users?.find(
      (user) => user._id === selectedDestination?.added_by
    )
  );

  const handleDeleteImage = (key: string) => {
    // THE CAUSE FOR THE ERROR IS THAT WHEN WE USE THE SPREAD OPERATOR FOR THE ENSTED OBJECT IT DOESN'T MAKE A DEEP COPY, THE INSIDE IS STILL POINTING TO THE SAME MEMORY ADDRESS, SO WHEN WE TRY TO UPDATE IT, IT JUST TRY TO UPDATE THE REDUX STATE, THE TEMPORARY SOLUTION IS TO MAKE A DEEP COPY USING JSON STRINGIFY THEN PARSE IT TO MAKE NEW COPY THEN MUTATE THAT
    const filtered =
      selectedDestination?.content.image_assets.assets_key.filter(
        (assetKey) => assetKey !== key
      );
    const editedDestination = JSON.parse(JSON.stringify(selectedDestination));
    editedDestination.content.image_assets.assets_key = filtered && [
      ...filtered,
    ];

    editDestination(dispatch, key, editedDestination);
  };

  return (
    <>
      {selectedDestination && user && (
        <Container
          maxWidth="xl"
          sx={{
            mt: 5,
            p: 5,
          }}
        >
          <Box
            p={2}
            sx={{ backgroundColor: "#fff", borderRadius: 3, boxShadow: 3 }}
          >
            <Box p={2}>
              <Typography variant="h6" fontWeight="bold">
                Gunung
                {" " +
                  selectedDestination?.title[0].toUpperCase() +
                  selectedDestination?.title.slice(1)}
              </Typography>
              <Box display="flex" mt={2} ml={2}>
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Status :
                    {" " +
                      selectedDestination?.status[0].toUpperCase() +
                      selectedDestination?.status.slice(1)}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Difficulty :
                    {" " +
                      selectedDestination?.difficulty[0].toUpperCase() +
                      selectedDestination?.difficulty.slice(1)}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Likes :{" " + selectedDestination?.likes}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Price per day :{" " + selectedDestination?.price_per_day}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Added by :{" " + user?.username}
                  </Typography>
                </Box>
                <Box ml={5}>
                  <Typography variant="subtitle2" fontWeight="medium">
                    City :
                    {selectedDestination?.location.city &&
                      " " +
                        selectedDestination?.location.city[0].toUpperCase() +
                        selectedDestination?.location.city.slice(1)}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Island :
                    {" " +
                      selectedDestination?.location.island[0].toUpperCase() +
                      selectedDestination?.location.island.slice(1)}
                  </Typography>
                  <Typography variant="subtitle2" fontWeight="medium">
                    Province :
                    {" " +
                      selectedDestination?.location.province[0].toUpperCase() +
                      selectedDestination.location.province.slice(1)}
                  </Typography>
                </Box>
              </Box>
            </Box>

            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                General Information
              </Typography>
              <Typography variant="body1">
                {selectedDestination.content.general_information}
              </Typography>
            </Box>
            {/* this box and table can be its own component */}
            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                Attention
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {Object.values(
                      selectedDestination.content.rules.attention
                    ).map((point, index) => (
                      <TableRow
                        key={selectedDestination._id + point + index}
                        sx={{
                          td: { border: 0 },
                        }}
                      >
                        <TableCell align="right" width={1}>
                          {index + 1}.
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body2">{point}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                Obligation
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {Object.values(
                      selectedDestination.content.rules.obligation
                    ).map((point, index) => (
                      <TableRow
                        key={selectedDestination._id + point + index}
                        sx={{
                          td: { border: 0 },
                        }}
                      >
                        <TableCell width={1}>{index + 1}.</TableCell>
                        <TableCell align="left">
                          <Typography variant="body2">{point}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>

            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                Prohibition
              </Typography>
              <TableContainer>
                <Table size="small">
                  <TableBody>
                    {Object.values(
                      selectedDestination.content.rules.prohibition
                    ).map((point, index) => (
                      <TableRow
                        key={selectedDestination._id + point + index}
                        sx={{
                          td: { border: 0 },
                        }}
                      >
                        <TableCell align="right" width={1}>
                          {index + 1}.
                        </TableCell>
                        <TableCell align="left">
                          <Typography variant="body2">{point}</Typography>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                Hiking Trails
              </Typography>
              <Box>
                <TableContainer>
                  {Object.values(selectedDestination.location.track).map(
                    (track, index) => (
                      <Table
                        key={selectedDestination._id + track + index}
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
                            <TableCell
                              sx={{ pl: 1, width: "93%" }}
                              align="left"
                            >
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                ml={1}
                              >
                                {track.track_name}
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
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                ml={1}
                              >
                                {track.description}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              td: { border: 0 },
                            }}
                          >
                            <TableCell sx={{ p: 1, verticalAlign: "top" }}>
                              Address
                            </TableCell>
                            <TableCell sx={{ p: 1, width: "93%" }} align="left">
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                ml={1}
                              >
                                {`Desa ${track.village}, Kecamatan ${track.district}, Kabupaten ${track.ward}, ${selectedDestination.location.province}, ${track.postal_code}`}
                              </Typography>
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              td: { border: 0 },
                            }}
                          >
                            <TableCell sx={{ p: 1, verticalAlign: "top" }}>
                              Contact
                            </TableCell>
                            <TableCell sx={{ p: 1, width: "93%" }} align="left">
                              <Typography
                                variant="body2"
                                fontWeight="bold"
                                ml={1}
                              >
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
                              {Object.values(track.accessibility).map(
                                (point, index) => (
                                  <Table
                                    key={
                                      selectedDestination._id + point + index
                                    }
                                  >
                                    <TableBody>
                                      <TableRow>
                                        <TableCell
                                          sx={{ p: 1, width: "93%" }}
                                          align="left"
                                        >
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
                                )
                              )}
                            </TableCell>
                          </TableRow>
                          <TableRow
                            sx={{
                              td: { border: 0 },
                            }}
                          >
                            <TableCell sx={{ p: 1, verticalAlign: "top" }}>
                              Image
                            </TableCell>
                            <TableCell sx={{ p: 1, width: "93%" }} align="left">
                              <Typography variant="body2" ml={1}>
                                undefined
                              </Typography>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    )
                  )}
                </TableContainer>
              </Box>
            </Box>
            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                Gallery
              </Typography>
              <Box display="flex" alignItems="center" justifyContent="center">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  flexWrap="wrap"
                  maxWidth="80%"
                >
                  {selectedDestination.content.image_assets.assets_key.length >
                  0 ? (
                    selectedDestination.content.image_assets.assets_key.map(
                      (key) => (
                        <ImageContainer key={key}>
                          <IconButton
                            color="error"
                            sx={{
                              position: "absolute",
                              right: 0,
                              top: 0,
                              p: 0,
                            }}
                            size="large"
                            onClick={() => {
                              handleDeleteImage(key);
                            }}
                          >
                            <HighlightOffIcon fontSize="medium" />
                          </IconButton>
                          <Image
                            src={`/api/v1/assets?bucket=${selectedDestination.content.image_assets.bucket}&key=${key}`}
                            srcSet={`/api/v1/assets?bucket=${selectedDestination.content.image_assets.bucket}&key=${key}`}
                            alt={key}
                            loading="lazy"
                          />
                        </ImageContainer>
                      )
                    )
                  ) : (
                    <Typography
                      variant="h6"
                      component="p"
                      color="#9fa2b4"
                      fontWeight="bold"
                      p={4}
                    >
                      Not Available
                    </Typography>
                  )}
                </Box>
              </Box>
            </Box>
            <Box
              p={2}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                variant="contained"
                color="error"
                size="medium"
                sx={{ textTransform: "none", mr: 2, width: "10vw" }}
                onClick={() => {
                  console.log("delete");
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{ textTransform: "none", mr: 2, width: "10vw" }}
                onClick={() => {
                  console.log("xoxo");
                }}
              >
                Edit
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default DestinationDetail;
