import { FC, useState } from "react";
import EditRulesRow from "./EditRulesRow";
import EditHikingTrails from "./EditHikingTrails";
import {
  editDestinationGeneralInformation,
  editDestinationKeyObject,
  editDestinationLocationKeyObject,
} from "../../../redux/slice/destinationsSlice";
import {
  deleteDestinationImage,
  submitDestinationEditChanges,
} from "../../../helpers/reduxApiCalls";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import useAxiosPrivate from "../../../hooks/useAxiosPrivate";
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
  const [images, setImages] = useState<any | null>(null);
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
      deleteDestinationImage(
        dispatch,
        axiosPrivate,
        key,
        editedDestination,
        currentUser
      );
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    destination &&
      dispatch(
        editDestinationKeyObject({
          destination: destination,
          content: e.target.value,
          key: e.target.name,
        })
      );
  };

  const handleSelectLocationChange = (e: SelectChangeEvent) => {
    destination &&
      dispatch(
        editDestinationLocationKeyObject({
          destination: destination,
          content: e.target.value,
          key: e.target.name,
        })
      );
  };

  const cancelEdit = () => {
    dispatch(ActionCreators.jumpToPast(2));
    navigate(`/informations/view/${id}`, { replace: true });
  };

  const uploadImages = async (): Promise<void> => {
    const imageData = new FormData();
    Object.values(images).forEach((e) =>
      imageData.append("image", e as string | Blob)
    );
    imageData.append("document", JSON.stringify(destination));
    const response = await axiosPrivate.put(
      `/api/v1/destinations/${destination?._id}/users/${currentUser?._id}`,
      imageData
    );
    console.log(response);
  };

  const submitChanges = async (): Promise<void> => {
    images && uploadImages();
    if (currentUser && destination) {
      submitDestinationEditChanges(
        dispatch,
        axiosPrivate,
        navigate,
        destination,
        currentUser
      );
    }
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
                  name="title"
                  multiline
                  maxRows={4}
                  variant="standard"
                  defaultValue={destination.title}
                  onBlur={(e) =>
                    dispatch(
                      editDestinationKeyObject({
                        destination: destination,
                        content: e.target.value,
                        key: e.target.name,
                      })
                    )
                  }
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
                        label="status"
                        value={destination?.status}
                        onChange={handleSelectChange}
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
                        label="difficulty"
                        value={destination?.difficulty}
                        onChange={handleSelectChange}
                      >
                        <MenuItem value={"pemula"}>Pemula</MenuItem>
                        <MenuItem value={"menengah"}>Menengah</MenuItem>
                        <MenuItem value={"ahli"}>Ahli</MenuItem>
                      </Select>
                    </FormControl>

                    <TextField
                      id="price_per_day"
                      name="price_per_day"
                      label="Price per day"
                      variant="standard"
                      type="number"
                      inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                      sx={{ mt: 1 }}
                      defaultValue={destination?.price_per_day}
                      onBlur={(e) =>
                        dispatch(
                          editDestinationKeyObject({
                            destination: destination,
                            content: Number(e.target.value),
                            key: e.target.name,
                          })
                        )
                      }
                    />
                  </Box>

                  <Box display="flex" flexDirection="column" p={1}>
                    <FormControl size="small" margin="normal">
                      <InputLabel id="island-label">Island</InputLabel>
                      <Select
                        labelId="island-label"
                        id="island"
                        name="island"
                        label="island"
                        value={destination?.location.island}
                        onChange={handleSelectLocationChange}
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
                      name="city"
                      multiline
                      maxRows={4}
                      variant="standard"
                      sx={{ mt: 1 }}
                      defaultValue={destination?.location.city}
                      onBlur={(e) =>
                        dispatch(
                          editDestinationLocationKeyObject({
                            destination: destination,
                            content: e.target.value,
                            key: e.target.name,
                          })
                        )
                      }
                    />

                    <TextField
                      id="province"
                      label="Province"
                      name="province"
                      multiline
                      maxRows={4}
                      variant="standard"
                      defaultValue={destination?.location.province}
                      sx={{ mt: 2 }}
                      onBlur={(e) =>
                        dispatch(
                          editDestinationLocationKeyObject({
                            destination: destination,
                            content: e.target.value,
                            key: e.target.name,
                          })
                        )
                      }
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
              <Typography fontWeight="bold" variant="subtitle1" mb={3}>
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
                    destination.content.image_assets.assets_key.map(
                      (key: string) => (
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
              <Box display="flex" justifyContent="center">
                <input
                  id="image_upload"
                  accept="image/*"
                  multiple
                  hidden
                  type="file"
                  onChange={(e) => setImages(e.target.files)}
                />
                <label htmlFor="image_upload">
                  <Button
                    variant="contained"
                    component="span"
                    size="medium"
                    sx={{ textTransform: "none" }}
                  >
                    Upload Images
                  </Button>
                </label>
              </Box>
            </Box>
            <Box
              mt={5}
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
                onClick={submitChanges}
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
