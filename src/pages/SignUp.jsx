import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
const defaultTheme = createTheme();

export default function SignUp() {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [phoneError, setPhoneError] = React.useState("");
  const [error, setError] = React.useState("");
  const [showConfirmEmail, setShowConfirmEmail] = React.useState(false);
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    if (!value.match(/^[0-9]*$/)) {
      setPhoneError("Invalid number");
    } else if (value.length < 8) {
      setPhoneError("Invalid phone number");
    } else {
      setPhoneError("");
    }
    setPhoneNumber(value);
  };
  const validateInput = () => {
    if (!firstName) {
      setError("First name is required.");
      return false;
    }
    if (!lastName) {
      setError("Last name is required.");
      return false;
    }
    if (!email || !isValidEmail(email)) {
      setError("Email is required.");
      return false;
    }
    if (!password) {
      setError("Password is required.");
      return false;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return false;
    }
    if (!phoneNumber || phoneError) {
      setError("Valid phone number is required.");
      return false;
    }

    return true;
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      setShowConfirmEmail(true);
      return "";
    }
    const user = {
      firstName,
      lastName,
      password,
      email,
      phoneNumber,
      role: "client",
    };
    console.log(user);
    try {
      const response = await axios.post(
        `https://smart-services-backend-test5.onrender.com/user/register`,
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.setItem("userId", response.data.userId);
      if (response.status === 200) {
        console.log("Registration successful!");
        setShowConfirmEmail(true);
      }
    } catch (error) {
      setError(error.response.data.error);
      setShowConfirmEmail(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <IconButton
          onClick={goToHome}
          style={{ top: "114px", color: "#DF2E38" }}
        >
          <ArrowBackIcon /> Back
        </IconButton>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "#DF2E38", color: "white" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  value={firstName} // Add this line
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  value={lastName} // Add this line
                  onChange={(e) => setLastName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={email} // Add this line
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"} // Use conditional type based on showPassword
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        sx={{
                          position: "absolute",
                          top: "50%",
                          right: 2,
                          transform: "translateY(-50%)",
                          cursor: "pointer",
                        }}
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? (
                          <VisibilityIcon fontSize="small" />
                        ) : (
                          <VisibilityOffIcon fontSize="small" />
                        )}
                      </IconButton>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  size="small"
                  label="Phone Number"
                  variant="outlined"
                  name="phone"
                  value={phoneNumber} // Add this line
                  onChange={handlePhoneChange}
                />
                {phoneError && <p className="error-message">{phoneError}</p>}
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              style={{
                marginTop: 5,
                marginBottom: 2,
                color: "white",
                backgroundColor: "#DF2E38",
              }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link
                  href="/SignIn"
                  variant="body2"
                  style={{ color: "#DF2E38" }}
                >
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
            {error && <p className="error-message">{error}</p>}
          </Box>
        </Box>
        {showConfirmEmail && (
          <Dialog
            open={showConfirmEmail}
            onClose={() => setShowConfirmEmail(false)}
          >
            <DialogTitle>Sign Up Succesfully</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Should be confirm the email Before Sign In
              </DialogContentText>
            
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setShowConfirmEmail(false)}
                color="primary"
              >
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Container>
    </ThemeProvider>
  );
}
