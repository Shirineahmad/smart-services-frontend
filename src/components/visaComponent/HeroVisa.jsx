import React from "react";
import { Box, Typography, Button } from "@mui/material";
import visaImage from "../../images/visadetails_collage.jpg";

const HeroVisa = ({countryName}) => {
  return (
    <div>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "38vh",
          backgroundImage: `url(${visaImage})`,
          backgroundSize: "contain", // Set to cover to maintain aspect ratio
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          top:"80px"
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
