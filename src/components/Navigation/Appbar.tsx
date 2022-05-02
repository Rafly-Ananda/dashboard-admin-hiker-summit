import { FC } from "react";
import AppBar, { AppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { User } from "../../interfaces";
import { styled } from "@mui/material/styles";
import { drawerWidth } from "../../config";

interface ComponentProps {
  user: User | null;
  drawerWidth: number;
}

const StyledAppBar = styled(AppBar)<AppBarProps>(({ theme }) => ({
  position: "fixed",
  width: `calc(100% - ${drawerWidth}px)`,
  marginLeft: `${drawerWidth - 20}px`,
  backgroundColor: "#f7f8fc",
  padding: theme.spacing(2),
}));

const Appbar: FC<ComponentProps> = ({ user }) => {
  const appBarLocation = location.pathname.split("/")[1];

  return (
    <>
      <StyledAppBar>
        <Toolbar>
          <Typography variant="h5" sx={{ color: "#252733", flexGrow: 1 }}>
            {appBarLocation}
          </Typography>
          <Typography variant="h5" component="p" sx={{ color: "#252733" }}>
            welcome, {user?.username}
          </Typography>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};

export default Appbar;
