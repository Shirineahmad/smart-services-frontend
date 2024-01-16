import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";


const defaultTheme = createTheme();

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showFailLogIn, setShowFailLogIn] = useState(false);
  const [failMessage, setFailMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();

    // Basic form validation
    if (!email.trim() || !password.trim()) {
      setFailMessage("Please enter both email and password.");
      setShowFailLogIn(true);
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:8000/user/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          
          },
        }
      );

      const data = response.data;

      if (response.status === 200) {
        console.log("Login successfully");

        localStorage.setItem("token", data.data.token);
        localStorage.setItem("userId", data.data._id);
        localStorage.setItem("role", data.data.role);

        if (data.data.role === "admin") {
          navigate("/AdminDashboard");
        }
        if (data.data.role === "client") {
          navigate("/");
        }

        // Reset error state on successful login
        setShowFailLogIn(false);
        setFailMessage("");
      } else {
        console.log("Login failed:", data.message);
        setShowFailLogIn(true);

        if (response.status === 401) {
          // Unauthorized (incorrect email or password)
          if (data.message.includes("password")) {
            setFailMessage("Incorrect password. Please try again.");
          } else {
            setFailMessage("Incorrect email or password. Please try again.");
          }
        } else if (response.status === 403) {
          // Forbidden (unverified email)
          setFailMessage("Email not verified. Please verify your email.");
        } else {
          // Other errors
          setFailMessage(data.message);
        }
      }
    } catch (error) {
      console.log("Error during login:", error.message);
      setShowFailLogIn(true);

      if (error.response) {
        if (error.response.status === 401) {
          // Unauthorized (incorrect email or password)
          if (error.response.data.message.includes("password")) {
            setFailMessage("Incorrect password. Please try again.");
          } else {
            setFailMessage("Incorrect email or password. Please try again.");
          }
        } else if (error.response.status === 403) {
          // Forbidden (unverified email)
          setFailMessage("Email not verified. Please verify your email.");
        } else {
          // Other errors
          setFailMessage(error.response.data.message);
        }
      } else {
        // Network or other errors
        setFailMessage("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSignIn}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email} // Add this line
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password} // Add this line
              onChange={(e) => setPassword(e.target.value)} // Add this line
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/SignUp" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Dialog open={showFailLogIn} onClose={() => setShowFailLogIn(false)}>
          <DialogTitle>Error</DialogTitle>
          <DialogContent>
            <DialogContentText>{failMessage}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowFailLogIn(false)} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>

        {/* <Copyright sx={{ mt: 8, mb: 4 }} /> */}
      </Container>
    </ThemeProvider>
  );
}
