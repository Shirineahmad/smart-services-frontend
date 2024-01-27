import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {Box,Button} from "@mui/material";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setValue, setServicesList } from "../../store/sliderSlice";
import { useEffect } from "react";
import { Flight } from "@mui/icons-material";
import MovingIcon from "@mui/icons-material/Moving";
import DescriptionIcon from "@mui/icons-material/Description";
import FlightSection from "./FlightSection";
import VisaSection from "./VisaSection";
import flight from "../../images/flight.jpg";
import { Link } from "react-router-dom";
const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#5D9C59",
  },
  justifyContent: "center",
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    justifyContent: "center",
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "#DF2E38",
    fontFamily: ["popins"].join(","),
    "&:hover": {
      color: "#5D9C59",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#5D9C59",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#5D9C59",
    },
  })
);

const StyledTabs = styled((props) => (
  <Tabs
    {...props}
    TabIndicatorProps={{ children: <span className=".MuiTabs-indicator" /> }}
  />
))({
  "& .MuiTabs-indicator": {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  "& .MuiTabs-flexContainer": {
    justifyContent: "center",
  },
});

export default function HeroSection() {
  const dispatch = useDispatch();
  
  const value = useSelector((state) => state.slider.value);
  const servicesList = useSelector((state) => state.slider.servicesList);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          `https://smart-services-backend-test5.onrender.com/services/getAll`
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

  const handleIcon = (name) => {
    switch (name) {
      case "Flight":
        return <Flight />; // Replace with the actual icon for Flight

      case "Language Exams":
        return <DescriptionIcon />; // Replace with the actual icon for Car

      case "Visa":
        return <MovingIcon />; // Replace with the actual icon for Train

      default:
        return ""; // Replace with a default icon for other cases
    }
  };

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    console.log("event", event);
    dispatch(setValue((prevValue, servicesListLength) => newValue));
  };
  return (
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
        src={flight}
        alt="idk"
        style={{
          width: "100%",
          height: "70vh",
          objectFit: "cover",
        }}
      />

      <Box
        sx={{
          width: "100%",
          flexGrow: 0,
          position: "absolute",
          height: 500,

          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "Center",
        }}
      >
        <Box sx={{ bgcolor: "#fff" }}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            {servicesList.map((service) => (
              <AntTab
                key={service._id}
                label={service.name}
                icon={handleIcon(service.name)}
              />
            ))}
          </AntTabs>
        </Box>
        <Box
          sx={{
            bgcolor: "#ddf7e3",
            width: "1200px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <StyledTabs
            value={value}
            onChange={handleChange}
            sx={{ width: "100%", justifyContent: "center", display: "flex" }}
          >
            {value === 0 && <VisaSection />}
            {value === 1 && (
              <Link to="/LanguageExam">
                <Button
                
                  sx={{
                    width: "128px",
                    height: "40px",
                    borderRaduis: "4px",
                    color: "white",
                    borderColor: "#DF2E38",
                    backgroundColor: "#DF2E38",
                    "&:hover": {
                      backgroundColor: "#5D9C59", // Change to the desired hover color
                    },
                  }}
                >
                 Go to Choose 
                </Button>
              </Link>
            )}
            {value === 2 && <FlightSection />}
          </StyledTabs>
        </Box>
      </Box>
    </Box>
  );
}
