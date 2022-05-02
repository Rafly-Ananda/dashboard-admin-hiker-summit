import { FC } from "react";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import LibraryBooksIcon from "@mui/icons-material/LibraryBooks";
import GroupIcon from "@mui/icons-material/Group";
import PaymentsIcon from "@mui/icons-material/Payments";
import BookOnlineIcon from "@mui/icons-material/BookOnline";
import PieChartIcon from "@mui/icons-material/PieChart";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { UseLocationProps } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../helpers/reduxApiCalls";

const menuItems = [
  {
    text: "Overview",
    icon: <PieChartIcon sx={{ color: "#A4A6B3" }} />,
    path: "/overview",
  },
  {
    text: "Tickets",
    icon: <BookOnlineIcon sx={{ color: "#A4A6B3" }} />,
    path: "/tickets",
  },
  {
    text: "Payments",
    icon: <PaymentsIcon sx={{ color: "#A4A6B3" }} />,
    path: "/payments",
  },
  {
    text: "Users",
    icon: <GroupIcon sx={{ color: "#A4A6B3" }} />,
    path: "/users",
  },
  {
    text: "Informations",
    icon: <LibraryBooksIcon sx={{ color: "#A4A6B3" }} />,
    path: "/informations",
  },
];

interface ComponentProps {
  drawerWidth: number;
  location: UseLocationProps;
}

const Sidebar: FC<ComponentProps> = ({ drawerWidth, location }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "#363740",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <Toolbar />
        <Typography variant="h5" align="center" sx={{ color: "#A4A6B3" }}>
          Dashboard
        </Typography>
        <Toolbar />

        <List>
          {menuItems.map((item) => (
            <ListItemButton
              key={item.text}
              onClick={() => {
                navigate(`${item.path}`);
              }}
              sx={{
                backgroundColor:
                  location.pathname === item.path ? "#3e4049" : null,
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  color:
                    location.pathname === item.path ? "#dde2ff" : "#A4A6B3",
                }}
              />
            </ListItemButton>
          ))}
        </List>
        <Divider sx={{ bgcolor: "#A4A6B3", opacity: "10%" }} />
        <List>
          <ListItemButton
            sx={{ textTransform: "none" }}
            onClick={() => {
              logout(dispatch);
            }}
          >
            <ListItemIcon>
              <LogoutOutlinedIcon sx={{ color: "#A4A6B3" }} />
            </ListItemIcon>
            <ListItemText primary={"Logout"} sx={{ color: "#A4A6B3" }} />
          </ListItemButton>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;
