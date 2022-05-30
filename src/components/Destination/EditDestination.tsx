import { FC } from "react";
import EditRulesRow from "./EditRulesRow";
import EditHikingTrails from "./EditHikingTrails";
import { editDestinationGeneralInformation } from "../../redux/slice/destinationsSlice";
import { editDestination } from "../../helpers/reduxApiCalls";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { ActionCreators } from "redux-undo";
import { useParams, useNavigate } from "react-router-dom";

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

const Image = styled("img")(({ theme }) => ({
  display: "block",
  width: "10vw",
}));

const EditDestination: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { currentUser } = useAppSelector((state) => state.user);
  const destination = useAppSelector((state) =>
    state?.destinations.present.destinations?.find(
      (destination) => destination._id === id
    )
  );

  const handleDeleteImage = (key: string) => {
    const filtered = destination?.content.image_assets.assets_key.filter(
      (assetKey) => assetKey !== key
    );
    const editedDestination = JSON.parse(JSON.stringify(destination));
    editedDestination.content.image_assets.assets_key = filtered && [
      ...filtered,
    ];

    currentUser &&
      editDestination(
        dispatch,
        axiosPrivate,
        key,
        editedDestination,
        currentUser
      );
  };

  const cancelEdit = () => {
    dispatch(ActionCreators.jumpToPast(2));
    navigate(`/informations/view/${id}`, { replace: true });
  };

  return (
    <>
      {destination && (
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
              <Box display="flex" alignItems="center">
                <TextField
                  id="destination_title"
                  label="Gunung"
                  multiline
                  maxRows={4}
                  value={destination?.title}
                  variant="standard"
                  // onChange={handleChange}
                />
              </Box>

              <Box display="flex" mt={2}>
                <Box display="flex">
                  <Box display="flex" flexDirection="column" p={1}>
                    <FormControl size="small" margin="normal">
                      <InputLabel id="active-status">Status</InputLabel>
                      <Select
                        labelId="active-status"
                        id="status"
                        name="status"
                        value={destination?.status}
                        label="status"
                        // onChange={handleChange}
                      >
                        <MenuItem value={"active"}>Active</MenuItem>
                        <MenuItem value={"unactive"}>Unactive</MenuItem>
                      </Select>
                    </FormControl>

                    <FormControl size="small" margin="normal">
                      <InputLabel id="difficulty-status">Difficulty</InputLabel>
                      <Select
                        labelId="difficulty-status"
                        id="difficulty"
                        name="difficulty"
                        value={destination?.difficulty}
                        label="difficulty"
                        // onChange={handleChange}
                      >
                        <MenuItem value={"pemula"}>Pemula</MenuItem>
                        <MenuItem value={"menengah"}>Menengah</MenuItem>
                        <MenuItem value={"ahli"}>Ahli</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      id="price_per_day"
                      label="Price per day"
                      multiline
                      maxRows={4}
                      value={destination?.price_per_day}
                      variant="standard"
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      sx={{ mt: 1 }}
                      // onChange={(e) => setXoxo(e.target.value)}
                    />
                  </Box>

                  <Box display="flex" flexDirection="column" p={1}>
                    <FormControl size="small" margin="normal">
                      <InputLabel id="island-label">Island</InputLabel>
                      <Select
                        labelId="island-label"
                        id="island"
                        name="island"
                        value={destination?.location.island}
                        label="island"
                        // onChange={handleChange}
                      >
                        <MenuItem value={"jawa"}>Jawa</MenuItem>
                        <MenuItem value={"sulawesi"}>Sulawesi</MenuItem>
                        <MenuItem value={"sumatera"}>Sumatera</MenuItem>
                        <MenuItem value={"kalimantan"}>Kalimantan</MenuItem>
                        <MenuItem value={"papua"}>Papua</MenuItem>
                        <MenuItem value={"lainnya"}>Lainnya</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      id="city"
                      label="City"
                      multiline
                      maxRows={4}
                      value={destination?.location.city}
                      variant="standard"
                      sx={{ mt: 1 }}
                      // onChange={(e) => setXoxo(e.target.value)}
                    />

                    <TextField
                      id="province"
                      label="Province"
                      multiline
                      maxRows={4}
                      value={destination?.location.province}
                      variant="standard"
                      sx={{ mt: 2 }}
                      // onChange={(e) => setXoxo(e.target.value)}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>

            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                General Information
              </Typography>
              <TextField
                margin="normal"
                id="general_information"
                name="general_information"
                label="General Information"
                type="text"
                maxRows={5}
                defaultValue={destination.content.general_information}
                onBlur={(e) =>
                  dispatch(
                    editDestinationGeneralInformation({
                      destination: destination,
                      content: e.target.value,
                    })
                  )
                }
                fullWidth
                multiline
                variant="outlined"
              />
            </Box>

            <Box p={2}>
              <EditRulesRow destination={destination} dispatch={dispatch} />
            </Box>

            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                Hiking Trails
              </Typography>
              <Box>
                <EditHikingTrails
                  destination={destination}
                  dispatch={dispatch}
                />
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
                  {destination.content.image_assets.assets_key.length > 0 ? (
                    destination.content.image_assets.assets_key.map((key) => (
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
                          src={`/api/v1/assets?bucket=${destination.content.image_assets.bucket}&key=${key}`}
                          srcSet={`/api/v1/assets?bucket=${destination.content.image_assets.bucket}&key=${key}`}
                          alt={key}
                          loading="lazy"
                        />
                      </ImageContainer>
                    ))
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
                onClick={() => cancelEdit()}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="success"
                size="medium"
                sx={{ textTransform: "none", mr: 2, width: "10vw" }}
                onClick={() => console.log("submit")}
              >
                Submit
              </Button>
            </Box>
          </Box>
        </Container>
      )}
    </>
  );
};

export default EditDestination;
