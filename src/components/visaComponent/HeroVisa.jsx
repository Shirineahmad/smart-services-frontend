import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { setServicesList } from "../../store/sliderSlice";
import { useEffect } from "react";
import axios from "axios";
const HeroVisa = ({ countryName }) => {
  const servicesList = useSelector((state) => state.slider.servicesList);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://smart-services-backend-test5.onrender.com/services/getByName/Visa`
        );
        console.log("response.data", response.data);
        if (response.data.success) {
          dispatch(setServicesList(response.data.data));
        } else {
          console.error("Error fetching products:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error.message);
      }
    };

    fetchServices();
  }, [dispatch]);
  return (
    <div>
      {servicesList &&
        servicesList.images &&
        servicesList.images.length > 0 && (
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "38vh",
              backgroundImage: `url(${servicesList.images[2]})`,
              backgroundSize: "contain", // Set to cover to maintain aspect ratio
              backgroundRepeat: "no-repeat",
              backgroundPosition: "top",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              top: "80px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontFamily: "popins",
                color: "#FFFFFF", // Change text color to contrast with the background
                fontWeight: "bold",
              }}
            >
              {countryName} Visa
            </Typography>
          </div>
        )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",

          backgroundColor: "#DDF7E3",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontFamily: "popins",
            color: "#5D9C59",
            fontWeight: "larger",
          }}
        >
          Pay Service Amount Through Online
        </Typography>
        {/* <Button
          variant="contained"
          sx={{
            fontFamily: "popins",
            backgroundColor: "#DF2E38",
            "&:hover": {
              backgroundColor: "#5D9C59",
            },
            marginTop: 2, // Add spacing between text and button
          }}
        >
          Direct Pay
        </Button> */}
      </Box>
    </div>
  );
};

export default HeroVisa;
