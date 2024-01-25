import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setServicesList } from "../../store/sliderSlice";
import { Link } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const SectionWeDo = () => {
  const dispatch = useDispatch();
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
  console.log("servicesList:", servicesList);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "50px",
        backgroundColor: "#DDF7E3",
      }}
    >
      <Typography
        variant="h1 "
        sx={{
          color: "#DF2E38",
          fontWeight: "700",
          textAlign: "center",
          fontSize: "larger",
          marginBottom: "20px",
        }}
      >
        {" "}
        What We Do ?
      </Typography>
      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {" "}
        {servicesList.map((service) => (
          <Grid
            key={service._id}
            xs={4}
            md={2}
            sx={{
              padding: "50px",
              height: "150px",
              backgroundColor: "white",
              "&:hover": {
                backgroundColor: "#DF2E38",
                color: "white",
                // Change to the desired hover color
              },
              fontWeight: 600,
              fontSize: "medium",
              border: "1px solid #ebebeb",
              textAlign: "center",
              boxShadow: 3,
            }}
          >
            {service.name}
          </Grid>
        ))}
      </Grid>
      <Link
        to="/"
        style={{
          color: "#DF2E38",
          textAlign: "center",
          textDecoration: "none",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginTop: "10px",
        }}
      >
        <ArrowForwardIcon /> View All
      </Link>
    </Box>
  );
};

export default SectionWeDo;
