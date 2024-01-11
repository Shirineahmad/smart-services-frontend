import * as React from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setValue, setServicesList } from "../../store/sliderSlice";
import { useEffect } from "react";
import { Flight } from "@mui/icons-material";
import MovingIcon from "@mui/icons-material/Moving";
import DescriptionIcon from "@mui/icons-material/Description";
import FlightSection from "./FlightSection";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#1890ff",
  },
});

const AntTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    minWidth: 0,
    [theme.breakpoints.up("sm")]: {
      minWidth: 0,
    },
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(1),
    color: "rgba(0, 0, 0, 0.85)",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&.Mui-selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&.Mui-focusVisible": {
      backgroundColor: "#d1eaff",
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
  // "& .MuiTabs-indicatorSpan": {
  //   maxWidth: 40,
  //   width: "100%",
  //   backgroundColor: "#635ee7",
  // },
});

const StyledTab = styled((props) => <Tab disableRipple {...props} />)(
  ({ theme }) => ({
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    color: "rgba(255, 255, 255, 0.7)",
    "&.Mui-selected": {
      color: "#fff",
    },
    "&.Mui-focusVisible": {
      backgroundColor: "rgba(100, 95, 228, 0.32)",
    },
  })
);

export default function CustomizedTabs() {
  const dispatch = useDispatch();
  const value = useSelector((state) => state.slider.value);
  const servicesList = useSelector((state) => state.slider.servicesList);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(
          "http://127.0.01:8000/services/getAll"
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
       return <Flight/>; // Replace with the actual icon for Flight

     case "Language Exams":
       return <DescriptionIcon/>; // Replace with the actual icon for Car

     case "Visa":
       return <MovingIcon/>; // Replace with the actual icon for Train

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
    <Box sx={{ width: "100%" }}>
      <Box sx={{ bgcolor: "#fff" }}>
        <AntTabs value={value} onChange={handleChange} aria-label="ant example">
          {servicesList.map((service) => (
            <AntTab
              key={service._id}
              label={service.name}
              icon={handleIcon(service.name)}
            />
          ))}
        </AntTabs>
        <Box sx={{ p: 3 }} />
      </Box>
      <Box sx={{ bgcolor: "#2e1534" }}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          // aria-label="styled tabs example"
        >
          {value === 0 && <FlightSection />}
          
        </StyledTabs>
        <Box sx={{ p: 3 }} />
      </Box>
    </Box>
  );
}
