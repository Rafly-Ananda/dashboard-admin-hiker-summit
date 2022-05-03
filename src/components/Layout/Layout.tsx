import { useLocation } from "react-router-dom";
import Box, { BoxProps } from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";
import Appbar from "../Navigation/Appbar";
import Sidebar from "../Navigation/Sidebar";
import { drawerWidth } from "../../config";
import { UseLocationProps } from "../../interfaces";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);
const OutletContainer = styled(Box)<BoxProps>(({ theme }) => ({
  width: "100%",
  padding: theme.spacing(2),
  minHeight: "100vh",
}));

const Layout = () => {
  const user = useAppSelector((state) => state.user.currentUser);
  const location = useLocation();

  return (
    <Box sx={{ display: "flex" }}>
      <Appbar user={user} drawerWidth={drawerWidth} />
      <Sidebar
        drawerWidth={drawerWidth}
        location={location as UseLocationProps}
      />
      <OutletContainer>
        <Offset />
        <Outlet />
      </OutletContainer>
    </Box>
  );
};

export default Layout;
