import { FC, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import { styled } from "@mui/material/styles";
import { User, Destination } from "../../interfaces";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../hooks/reduxHooks";

interface RowProp {
  user: User;
  handleDeleteUser: (id: string) => void;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const CardDetails = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "row",
}));

const UserRow: FC<RowProp> = ({ user, handleDeleteUser, setOpenEditModal }) => {
  const { destinations } = useAppSelector((state) => state.destinations);
  const [open, setOpen] = useState<boolean>(false);
  const [destinationWl, setDestinationWl] = useState();
  const navigate = useNavigate();

  const formatDate = (date: any) => {
    const baseDate = new Date(date);
    const formattedDate = baseDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    return formattedDate;
  };

  // useEffect(() => {
  //   setDestinationWl(
  //     destinations?.docs.filter((destination) =>
  //       user.destination_wishlist.includes(destination._id)
  //     )
  //   );
  // }, []);

  // console.log(destinationWl);

  return (
    <>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <Avatar
              alt={user?.username}
              src={
                user.image_assets.assets_key
                  ? `api/v1/assets?bucket=${user?.image_assets.bucket}&key=${user?.image_assets.assets_key}`
                  : "#"
              }
              sx={{ width: 40, height: 40, marginRight: 2 }}
            />
            {user.username}
          </Box>
        </TableCell>
        <TableCell>{user.email}</TableCell>
        <TableCell>{user.is_admin ? "True" : "False"}</TableCell>
        <TableCell>
          {user.user_status[0].toUpperCase() + user.user_status.slice(1)}
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            color="primary"
            size="small"
            sx={{ textTransform: "none", mr: 2 }}
            onClick={() => {
              setOpenEditModal(true);
              navigate(`/users/${user._id}`);
            }}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            size="small"
            sx={{ textTransform: "none" }}
            onClick={() => handleDeleteUser(user._id)}
          >
            Delete
          </Button>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box
              component="div"
              sx={{ margin: 5, display: "flex", justifyContent: "center" }}
            >
              <Box
                component="div"
                sx={{
                  display: "flex",
                  width: "50%",
                  justifyContent: "space-evenly",
                  padding: 2,
                  borderRadius: 3,
                  boxShadow: 1,
                }}
              >
                <CardDetails>
                  <List>
                    <ListItem>
                      <ListItemText primary="user_id" secondary={user._id} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Username"
                        secondary={user.username}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Email" secondary={user.email} />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="First Name"
                        secondary={user.first_name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Last Name"
                        secondary={user.last_name}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone Number"
                        secondary={`0${user.phone_number}`}
                      />
                    </ListItem>
                  </List>
                </CardDetails>
                <CardDetails>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="User Status"
                        secondary={user.user_status}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Is Admin"
                        secondary={user.is_admin ? "True" : "False"}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Is Verified"
                        secondary={user.verified ? "True" : "False"}
                      />
                    </ListItem>

                    {/* 
                    <List dense>
                      {user?.destination_wishlist && destinations
                        ? destinations.map((destination, i) => (
                            <ListItem key={(user._id + destination, i)}>
                              <ListItemText
                                secondary={`${
                                  user.destination_wishlist.includes(
                                    destination._id
                                  ) && `Gunung ${destination.title}`
                                }`}
                              />
                            </ListItem>
                          ))
                        : " -"}
                    </List> */}

                    <ListItem>
                      <ListItemText
                        primary="Created At"
                        secondary={formatDate(user.createdAt)}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Updated At"
                        secondary={formatDate(user.updatedAt)}
                      />
                    </ListItem>
                  </List>
                </CardDetails>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

export default UserRow;
