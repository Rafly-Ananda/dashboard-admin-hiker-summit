import { FC } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import HikingTrailsTable from "./HikingTrailsTable";
import SubTypography from "./View/SubTypography";
import RulesRow from "./RulesRow";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { Destination } from "../../interfaces";

const ImageContainer = styled("div")(({ theme }) => ({
  position: "relative",
  padding: theme.spacing(1),
  margin: theme.spacing(1),
}));

const Image = styled("img")(() => ({
  display: "block",
  width: "10vw",
}));

const DestinationDetail: FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const selectedDestination = useAppSelector((state) =>
    state?.destinations.present.destinations?.find(
      (destination) => destination._id === id
    )
  );

  const user = useAppSelector((state) =>
    state?.users?.users?.find(
      (user) => user._id === selectedDestination?.added_by
    )
  );

  const xx = ["status", "difficulty", "likes", "price_per_day"];

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
            borderRadius={3}
            boxShadow={3}
            sx={{ backgroundColor: "#ffff" }}
          >
            <Box p={2}>
              <Box display="flex" alignItems="center">
                <Typography variant="h6" fontWeight="bold">
                  Gunung
                  {" " +
                    selectedDestination?.title[0].toUpperCase() +
                    selectedDestination?.title.slice(1)}
                </Typography>
              </Box>

              <Box display="flex" mt={2} ml={2}>
                <Box>
                  {/* {xx.map((e) => (
                    <SubTypography title={e} content={selectedDestination[e]} />
                  ))} */}
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
              <Typography variant="body1" p={2}>
                {selectedDestination.content.general_information}
              </Typography>
            </Box>

            <Box p={2}>
              <RulesRow destination={selectedDestination} />
            </Box>

            <Box p={2}>
              <Typography fontWeight="bold" variant="subtitle1">
                Hiking Trails
              </Typography>
              <Box>
                <HikingTrailsTable destination={selectedDestination} />
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
                  console.log("delete destination");
                }}
              >
                Delete
              </Button>
              <Button
                variant="contained"
                color="primary"
                size="medium"
                sx={{ textTransform: "none", mr: 2, width: "10vw" }}
                onClick={() => navigate(`/informations/edit/${id}`)}
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
