import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import Fade from "@mui/material/Fade";

import img1 from "../../images/home1.jpg";
import img2 from "../../images/pexels-element-digital-1051075.jpg";
import img3 from "../../images/home3.jpg";
import img4 from "../../images/home4.jpg";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

const images = [
  {
    label1: " Welcome To The Shiro Group",
    label2: "Global Travel Services",
    imgPath: img1,
  },
  {
    label1: "   to multiple destinations around the world.",
    label2: "  We Offers Comprehensive Tour Packages",
    imgPath: img2,
  },
  {
    label1: " A Portal that Offers Multiple Travel Services.",
    label2: " It provides online booking facilities anywhere in the world.",
    imgPath: img3,
  },
  {
    label1: " Experience the Convenience and Savings",
    label2: " Find full service in one screen include Air, ticketing and more.",
    imgPath: img4,
  },
];

function HeroCarousel() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => (prevActiveStep + 1) % maxSteps);
  };

  const handleBack = () => {
    setActiveStep(
      (prevActiveStep) => (prevActiveStep - 1 + maxSteps) % maxSteps
    );
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <Box sx={{ width: "100%", flexGrow: 0, position: "relative", height: 600 }}>
      <AutoPlaySwipeableViews
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
        transition={Fade} // Use Fade for transition
        interval={5000}
        style={{
          transform: "none",
          transition: "none",
        }}
      >
        {images.map((step, index) => (
          <div key={step.label1}>
            {Math.abs(activeStep - index) <= 2 && (
              <Box
                component="img"
                sx={{
                  height: 600,
                  display: "block",
                  width: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.6)",
                }}
                src={step.imgPath}
                alt={step.label1}
              />
            )}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <Fade in={true} timeout={1000}>
        <Paper
          square
          elevation={0}
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bgcolor: "transparent",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            zIndex: "1",
            transition: "none", // Set transition to none
          }}
        >
          <Typography
            variant="h4"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "popins",
              fontWeight: 700,
              letterSpacing: ".0.7rem",
              color: "#DF2E38",
              textDecoration: "none",
            }}
          >
            {images[activeStep].label1}
          </Typography>
          <Typography
            variant="h4"
            sx={{
              mr: 1,
              display: { xs: "none", md: "flex" },
              fontFamily: "Caveat",
              fontWeight: 700,
              letterSpacing: ".0.7rem",
              color: "#DF2E38",
              textDecoration: "none",
            }}
          >
            {images[activeStep].label2}
          </Typography>
        </Paper>
      </Fade>
      <MobileStepper
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        sx={{
          position: "absolute",
          top: 522,
          left: 0,
          right: 0,
          fontWeight: 700,
          bgcolor: "transparent",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",

          zIndex: "1",
          "& .MuiMobileStepper-dotActive": {
            backgroundColor: "#DF2E38",
          },
          "&.MuiMobileStepper-dotActive": {
            color: "#5D9C59",
          },
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            sx={{ color: "#DF2E38", fontWeight: 700, fontSize: "medium" }}
          >
            Next
            {theme.direction === "rtl" ? (
              <KeyboardArrowLeft
                sx={{ color: "#DF2E38", fontSize: "medium" }}
              />
            ) : (
              <KeyboardArrowRight
                sx={{ color: "#DF2E38", fontSize: "medium" }}
              />
            )}
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            sx={{ color: "#DF2E38", fontWeight: 700, fontSize: "medium" }}
          >
            {theme.direction === "rtl" ? (
              <KeyboardArrowRight
                sx={{ color: "#DF2E38", fontWeight: 700, fontSize: "medium" }}
              />
            ) : (
              <KeyboardArrowLeft
                sx={{ color: "#DF2E38", fontWeight: 700, fontSize: "medium" }}
              />
            )}
            Back
          </Button>
        }
      />
    </Box>
  );
}

export default HeroCarousel;
