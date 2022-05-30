import * as React from "react";
import { FC, useEffect } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
import { User } from "../../interfaces";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Box from "@mui/material/Box";
import Slide from "@mui/material/Slide";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useParams } from "react-router-dom";

interface ComponentProps {
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateUser: (
    e: React.FormEvent<HTMLFormElement>,
    id: string
  ) => Promise<void>;
  users: Array<User>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const UserEditForm: FC<ComponentProps> = ({
  openEditModal,
  setOpenEditModal,
  users,
  user,
  setUser,
  handleUpdateUser,
}) => {
  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    setUser(Object.values(users.filter((user) => user._id === id))[0]);
  }, [id]);

  const handleCloseModal = () => {
    setOpenEditModal(false);
    navigate("/users");
  };

  const handleChangeStateString = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleChangeStateSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    let boolState: boolean = false;
    if (value === "True" || value === "False") {
      boolState = value === "True" ? true : false;
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value === "True" || value === "False" ? boolState : value,
    }));
  };

  return (
    <Box>
      <Dialog
        open={openEditModal}
        onClose={handleCloseModal}
        TransitionComponent={Transition}
        keepMounted
      >
        <DialogTitle sx={{ mt: 1 }}>Update User Credentials</DialogTitle>
        <DialogContent>
          <Box
            component="form"
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
              handleUpdateUser(e, id as string);
            }}
            noValidate
          >
            <TextField
              autoFocus
              margin="normal"
              name="email"
              label="Email Address"
              type="email"
              value={user?.email}
              onChange={handleChangeStateString}
              fullWidth
              variant="outlined"
            />

            <TextField
              margin="normal"
              name="username"
              label="Username"
              type="text"
              value={user?.username}
              onChange={handleChangeStateString}
              fullWidth
              variant="outlined"
            />

            <TextField
              margin="normal"
              name="first_name"
              label="First Name"
              type="text"
              value={user?.first_name}
              onChange={handleChangeStateString}
              fullWidth
              variant="outlined"
            />

            <TextField
              margin="normal"
              name="last_name"
              label="Last Name"
              type="text"
              value={user?.last_name}
              onChange={handleChangeStateString}
              fullWidth
              variant="outlined"
            />

            <TextField
              margin="normal"
              name="phone_number"
              label="Phone Number"
              type="number"
              value={user?.phone_number}
              onChange={handleChangeStateString}
              fullWidth
              variant="outlined"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="user_status_option">User Status</InputLabel>
              <Select
                id="user_status_option"
                name="user_status"
                value={user?.user_status}
                label="User Status"
                onChange={handleChangeStateSelect}
                disabled
              >
                <MenuItem value={"umum"}>Umum</MenuItem>
                <MenuItem value={"guide"}>Guide</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="verified_option">Is Verified</InputLabel>
              <Select
                id="verified_option"
                name="verified"
                value={user?.verified ? "True" : "False"}
                label="Is Verified"
                onChange={handleChangeStateSelect}
              >
                <MenuItem value={"True"}>True</MenuItem>
                <MenuItem value={"False"}>False</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth margin="normal">
              <InputLabel id="is_admin_option">Is Admin</InputLabel>
              <Select
                id="is_admin_option"
                name="is_admin"
                value={user?.is_admin ? "True" : "False"}
                label="Is Admin"
                onChange={handleChangeStateSelect}
              >
                <MenuItem value={"True"}>True</MenuItem>
                <MenuItem value={"False"}>False</MenuItem>
              </Select>
            </FormControl>

            <Box
              sx={{
                mt: 1,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <Button type="submit" sx={{ marginRight: 2 }}>
                submit
              </Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default UserEditForm;
