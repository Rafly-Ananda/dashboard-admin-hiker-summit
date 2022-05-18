import { FC } from "react";
import InformationsTable from "../components/Destination/InformationsTable";
import Spinner from "../components/Spinner/Spinner";
import Box from "@mui/material/Box";
import { useAppSelector } from "../hooks/reduxHooks";

const Informations: FC = () => {
  const { isFetching, destinations } = useAppSelector(
    (state) => state.destinations
  );
  // const islands = Array.from(
  //   new Set(destinations?.map((destination) => destination.location.island))
  // );

  // ! PLACEHOLDER, because if destination in that island does not exist it will not render the table
  const islands = ["jawa", "sulawesi", "sumatera", "kalimantan", "papua"];

  return (
    <>
      {isFetching ? (
        <Box
          sx={{
            position: "relative",
            height: "92%",
          }}
        >
          <Spinner />
        </Box>
      ) : (
        islands.map((island) => (
          <InformationsTable key={island} tableTitle={island} />
        ))
      )}
    </>
  );
};

export default Informations;

// return (
//   <div
//     style={{
//       marginTop: "100px",
//     }}
//   >
//     <img src="" alt="" />
//     <div>
//       {destinations
//         ? destinations.map((destination, index) => (
//             <div key={index}>
//               <div
//                 style={{
//                   border: "2px solid red",
//                   width: "20vw",
//                   height: "20vh",
//                   margin: "2em",
//                   overflow: "hidden",
//                 }}
//               >
//                 <h1>{destination.title}</h1>

//                 <img
//                   style={{
//                     maxWidth: "200px",
//                     maxHeight: "200px",
//                   }}
//                   src={`http://localhost:3000/api/v1/assets?bucket=${destination.content.image_assets.bucket}&key=${destination.content.image_assets.assets_key[0]}`}
//                   alt="img-1"
//                 />
//               </div>
//             </div>
//           ))
//         : "loading"}
//     </div>
//   </div>
// );

// const handleImagePostMultiple = async () => {
//   // ? testing multiple images
//   const formData = new FormData();

//   Object.entries(payload).forEach((data: any, index: number) => {
//     console.log(Object.values(data));
//     formData.append(`image`, data[1]);
//   });

//   formData.append("document", JSON.stringify(xoxo));
//   console.log(formData);

//   const response = await axios.post(
//     `${BASE_URL}/api/v1/destinations/6254461f13d8d01989ec3a12?bucket=destination_assets`,
//     formData,
//     {
//       headers: {
//         "Content-Type": "multipart/form-data",
//         Authorization:
//           "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNTQ0NjFmMTNkOGQwMTk4OWVjM2ExMiIsImlzX2FkbWluIjp0cnVlLCJpYXQiOjE2NTExNjc5MDMsImV4cCI6MTY1MTE3NTEwM30.s5TmFD0-AYeIJ4yJYQu0GaOYHF1jRQnftlEhdELWoZA",
//       },
//     }
//   );
// };
