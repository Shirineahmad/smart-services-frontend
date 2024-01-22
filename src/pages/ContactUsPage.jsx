import React from "react";
import Header from "../components/homeComponent/Header";
import Footer from "../components/homeComponent/Footer";

import {
  Typography,
  Box,
  Grid,
  Paper,
  Button,
  TextareaAutosize,
  TextField,

 
} from "@mui/material";
import contact from "../images/pexels-fauxels-3183150.jpg";
import { useForm } from "@formspree/react";

const ContactUsPage = () => {
  const [state, handleSubmit] = useForm("xknldeaq");
  const [showThanksMessage, setShowThanksMessage] = React.useState(false);
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
    number: "",
    area: "",
    destination:"",
    services:""
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      name: e.target.value,
    });
  };
  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
   const handleInputNumber = (e) => {
     setFormData({
       ...formData,
      number: e.target.value,
     });
   };
const handleInputEmail = (e) => {
  setFormData({
    ...formData,
    email: e.target.value,
  });
  };
  
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSubmit(e);
    setFormData({name: "",
    email: "",
    message: "",
    number: "",
    area: "",
    destination:"",
    services:"" });
    setShowThanksMessage(true);
  };

  const closeModal = () => {
    setShowThanksMessage(false);
  };

  return (
    <div>
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        <img
          src={contact}
          alt="idk"
          style={{
            width: "100%",
            height: "70vh",
            objectFit: "cover",
          }}
        />

        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            fontFamily: "popins",
            color: "#FFFFFF",
            fontWeight: "bold",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          Contact Us
        </Typography>
        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            fontFamily: "popins",
            color: "#FFFFFF",
            fontWeight: "bold",
            top: "60%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          Have any questions? We’d love to hear from you.
        </Typography>
      </Box>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap", // Allow items to wrap onto the next line
          margin: "20px",
        }}
      >
        <Grid item lg={6} md={6} sm={12} xs={12}>
          <Paper
            sx={{
              boxShadow: "3",
              height: "70vh",
              width: "100vh",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "white",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#DF2E38", paddingLeft: "37px", paddingTop: "10px" }}
            >
              {" "}
              Send an inquiry
            </Typography>
            <form
              onSubmit={handleFormSubmit}
              style={{
                marginTop: "35px",
                marginLeft: "35px",
                marginRight: "35px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Grid container spacing={2}>
                {/* First pair of elements */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "15px",
                  }}
                >
                  <TextField
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputEmail}
                    placeholder="E-mail"
                    required
                    fullWidth
                    sx={{
                      "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus":
                        {
                          outlineColor: "red",
                          outline: "1px solid red",
                          border: "1px solid red",
                        },
                    }}
                  />
                </Grid>
                {/* Second pair of elements */}
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "15px",
                  }}
                >
                  <TextField
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Name"
                    required
                    fullWidth
                    sx={{
                      "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus":
                        {
                          outlineColor: "red",
                          outline: "1px solid red",
                          border: "1px solid red",
                        },
                    }}
                  />
                  <TextField
                    type="text"
                    name="phoneNumber"
                    value={formData.number}
                    onChange={handleInputNumber}
                    placeholder="Phone Number"
                    required
                    fullWidth
                    sx={{
                      "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus":
                        {
                          outlineColor: "red",
                          outline: "1px solid red",
                          border: "1px solid red",
                        },
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "15px",
                  }}
                ></Grid>
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                  }}
                >
                  <TextareaAutosize
                    placeholder="Your message..."
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    name="message"
                    required
                    style={{ mt: 2, width: "100vh", height: "100px" }}
                  />
                </Grid>
              </Grid>
              <Button
                style={{
                  mt: 2,
                  backgroundColor: "#DF2E38",
                  color: "white",
                  border: "1px solid white.700",
                  fontSize: "1rem",
                  marginTop: "5px",
                  fontWeight: "bold",
                  width: "maxContent",
                  "&:hover": {
                    backgroundColor: "#5D9C59", // Change to the desired hover color
                  },
                }}
                disabled={state.submitting}
                type="submit"
              >
                SEND
              </Button>
            </form>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper
            sx={{
              height: "50vh",
              width: "100vh",
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1A2027" : "white",
              boxShadow: "3",
            }}
          >
            <Typography
              variant="h4"
              sx={{ color: "#DF2E38", paddingLeft: "37px", paddingTop: "10px" }}
            >
              {" "}
              Our Location
            </Typography>
            <Typography
              variant="h6"
              sx={{ paddingLeft: "37px", paddingTop: "10px" }}
            >
              {" "}
              Hamra
            </Typography>
            <Typography
              variant="h6"
              sx={{ paddingLeft: "37px", paddingTop: "10px" }}
            >
              {" "}
              Street Makdesi
            </Typography>
            <Typography
              variant="h6"
              sx={{ paddingLeft: "37px", paddingTop: "10px" }}
            >
              smart.services@gmail.com{" "}
            </Typography>
            <Typography
              variant="h6"
              sx={{ paddingLeft: "37px", paddingTop: "10px" }}
            >
              Phone Number :0096176056979{" "}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      {state.succeeded && showThanksMessage && (
        <div
          sx={{ fixed: "inset-0", z: 50, flex: "items-center justify-center" }}
        >
          <div className="fixed inset-0 bg-black opacity-50"></div>
          <div className="bg-white p-6 relative z-10 w-96">
            <div className="  flex items-center justify-center">
              <div className="text-center">
                <p className="text-2xl m-12 w-2/3 mx-auto">
                  Thank you for contacting us!
                  <br />
                  We will get back to you shortly.
                </p>
                <div className="flex justify-end bg-gray-100 p-6 items-center">
                  <Button
                    onClick={closeModal}
                    sx={{
                      bg: "#DF2E38",
                      color: "white",
                      fontSize: "1rem",
                      fontWeight: "bold",
                      py: 1,
                      px: 2,
                      border: "1px solid white.700",
                      width: "32",
                      "&:hover": {
                        backgroundColor: "#5D9C59", // Change to the desired hover color
                      },
                    }}
                  >
                    CANCEL
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ContactUsPage;
