import { FC } from "react";
import Spinner from "../components/Spinner/Spinner";
import Box from "@mui/material/Box";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../hooks/reduxHooks";

const Informations: FC = () => {
  const isFetching = useAppSelector((state) => state.fetch.isFetching);

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
        <Outlet />
      )}
    </>
  );
};

export default Informations;
