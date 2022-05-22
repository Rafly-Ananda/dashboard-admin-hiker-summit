import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import { FC, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../hooks/reduxHooks";
import { login } from "../helpers/reduxApiCalls";

const ErrorSpan = styled("span")(({ theme }) => ({
  color: "red",
  marginLeft: 3,
}));

const Login: FC = () => {
  const { currentUser } = useAppSelector((state) => state.user);
  const { isFetching, error } = useAppSelector((state) => state.fetch);
  const dispatch = useAppDispatch();
  const [username, setUsername] = useState<string>();
  const [password, setPassword] = useState<string>();
  const navigate = useNavigate();
  const location: any = useLocation();

  const from = location.state?.from?.pathname || "/overview";

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(dispatch, { username, password });
  };

  useEffect(() => {
    currentUser?.is_admin && navigate(from, { replace: true });
  }, [currentUser]);

  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   console.log({
  //     email: data.get("email"),
  //     password: data.get("password"),
  //   });
  // };

  return (
    <Container
      component="main"
      maxWidth={false}
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          maxWidth: "20%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 5,
          boxShadow: 1,
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Admin Portal
        </Typography>
        <Box component="form" onSubmit={handleLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoFocus
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
          />
          {error && <ErrorSpan> ** access denied</ErrorSpan>}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            disabled={isFetching}
            sx={{ mt: error ? 1 : 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
