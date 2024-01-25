import { useEffect } from "react";
import { styled } from "@mui/material/styles";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setValue, setServicesList } from "../../store/sliderSlice";

const AntTabs = styled(Tabs)({
  borderBottom: "1px solid #e8e8e8",
  "& .MuiTabs-indicator": {
    backgroundColor: "#5D9C59",
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

function SliderServices() {
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

  const handleChange = (event, newValue) => {
    console.log("newValue", newValue);
    console.log("event", event);
    dispatch(setValue((prevValue, servicesListLength) => newValue));
  };

  const handleArrowClick = (direction) => {
    console.log("handleArrowClick triggered with direction:", direction);
    console.log("servicesList:", servicesList);

    if (direction === "prev") {
      // If direction is "prev", update value accordingly
      dispatch(
        setValue(
          (prevValue) =>
            (prevValue - 1 + servicesList.length) % servicesList.length
        )
      );
    } else {
      // If direction is not "prev", update value accordingly
      dispatch(setValue((prevValue) => (prevValue + 1) % servicesList.length));
    }
  };

  console.log("servicesList:", servicesList);
  console.log("value:", value);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      <Box
        sx={{
          width: "100%",
          display: "flex",
          flexDirection: "row",
          height: "100%",
        }}
      >
        {/* <Box
          sx={{
            bgcolor: "#fff",
            width: "100%",
            height: "100%",
          }}
        > */}

        <Box
          sx={{
            p: 3,
            height: 200,

            width: "75%",
            margin: "20px",
          }}
        >
          {servicesList.length > 0 &&
            servicesList[value] &&
            servicesList[value].name && (
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  marginTop: "10px",
                  marginLeft: "10px",
                }}
              >
                {servicesList[value].name}
              </Typography>
            )}

          <Typography
            variant="h6"
            sx={{
              marginLeft: "10px",
              color: "green",
            }}
          >
            Allowing you to travel with complete peace of mind
          </Typography>
          {servicesList.length > 0 &&
            servicesList[value] &&
            servicesList[value].description &&
            servicesList[value].description[0] &&
            JSON.parse(servicesList[value].description[0]).map(
              (desc, index) => <li key={index}>{desc}</li>
            )}
        </Box>
        {/* </Box> */}
        <Box
          sx={{
            width: "100%",
            height: "100%",
            marginTop: 5,
            marginRight: 5,
          }}
        >
          {/* <Box sx={{ p: 3, height: "100%", boxShadow: 3, width: "75%" }}> */}
          {servicesList.length > 0 &&
            servicesList[value] &&
            servicesList[value].images &&
            servicesList[value].images[0] && (
              <img
                src={servicesList[value].images[0]}
                alt="no"
                style={{ maxWidth: "100%", height: "100%" }}
              />
            )}
          {/* </Box> */}
        </Box>
      </Box>
      <Box
        sx={{
          width: 60,
          display: "flex",
          flexDirection: "row",
          height: "100%",
          backgroundColor: "#DDF7E3",
          justifyContent: "center",
          padding: 1,
          color: "red",
          marginBottom: 2,
          marginLeft: 5,
          borderRadius: "16px",
        }}
      >
        <ArrowBackIosIcon
          onClick={() => handleArrowClick("prev")}
          aria-label="styled tabs example"
        />
        <ArrowForwardIosIcon
          onClick={() => handleArrowClick("next")}
          aria-label="styled tabs example"
        />
      </Box>
      <AntTabs value={value} onChange={handleChange} aria-label="ant example">
        {servicesList.map((service) => (
          <AntTab key={service._id} label={service.name} />
        ))}
      </AntTabs>
    </Box>
  );
}

export default SliderServices;
