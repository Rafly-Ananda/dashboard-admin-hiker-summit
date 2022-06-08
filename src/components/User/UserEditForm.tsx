import React, { FC } from "react";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { TransitionProps } from "@mui/material/transitions";
import { useNavigate } from "react-router-dom";
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
import { modifiyUser } from "../../redux/slice/usersSlice";
import { User } from "../../interfaces";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";

interface ComponentProps {
  openEditModal: boolean;
  setOpenEditModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleUpdateUser: (e: React.FormEvent<HTMLFormElement>, user: User) => void;
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
  handleUpdateUser,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) =>
    state.users.users?.find((user) => user._id === id)
  );

  const handleCloseModal = () => {
    setOpenEditModal(false);
    navigate("/users");
  };

  const handleChangeStateString = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    id && dispatch(modifiyUser({ userId: id, content: value, key: name }));
  };

  const handleChangeStateSelect = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    let boolState: boolean = false;
    if (value === "True" || value === "False") {
      boolState = value === "True" ? true : false;
    }

    id &&
      dispatch(
        modifiyUser({
          userId: id,
          content: value === "True" || value === "False" ? boolState : value,
          key: name,
        })
      );
  };

  return (
    <>
      {user && (
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
                  handleUpdateUser(e, user);
                }}
                noValidate
              >
                <TextField
                  autoFocus
                  margin="normal"
                  name="email"
                  label="Email Address"
                  type="email"
                  defaultValue={user?.email}
                  onBlur={handleChangeStateString}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  margin="normal"
                  name="username"
                  label="Username"
                  type="text"
                  defaultValue={user?.username}
                  onBlur={handleChangeStateString}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  margin="normal"
                  name="first_name"
                  label="First Name"
                  type="text"
                  defaultValue={user?.first_name}
                  onBlur={handleChangeStateString}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  margin="normal"
                  name="last_name"
                  label="Last Name"
                  type="text"
                  defaultValue={user?.last_name}
                  onBlur={handleChangeStateString}
                  fullWidth
                  variant="outlined"
                />

                <TextField
                  margin="normal"
                  name="phone_number"
                  label="Phone Number"
                  type="number"
                  defaultValue={user?.phone_number}
                  onBlur={handleChangeStateString}
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
      )}
    </>
  );
};

export default UserEditForm;
