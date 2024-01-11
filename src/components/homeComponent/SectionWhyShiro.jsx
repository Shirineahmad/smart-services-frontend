import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Box, Button, CardActionArea, CardActions } from "@mui/material";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setServicesList } from "../../store/sliderSlice";
const SectionWhyShiro = () => {
    const dispatch = useDispatch();
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
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // justifyContent: "space-around",
        margin: "50px 20px",
        backgroundColor: "",
      }}
    >
      <Typography
        gutterBottom
        variant="h1 "
        sx={{
          color: "#DF2E38",
          fontWeight: "700",
          textAlign: "center",
          fontSize: "larger",
          marginBottom: "20px",
        }}
        component="div"
      >
        Why Shiro Group ?
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-around",
          // margin: "50px 20px",
          backgroundColor: "",
        }}
      >
        <CardActions sx={{ alignItems: "flex-start" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: "2.5rem",
              color: "#DF2E38",
              fontWeight: 700,
            }}
          >
            1
          </Typography>
        </CardActions>
        <Card sx={{ maxWidth: 300, height: "340px" }}>
          {/* <CardActionArea> */}
          <CardMedia
            component="img"
            height="200"
            image={
              servicesList.length > 0 &&
              servicesList[0] &&
              servicesList[0].images &&
              servicesList[0].images[0]
            }
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Application of technology in service delivery & enquiry handling
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>
        <CardActions sx={{ alignItems: "flex-end" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: "2.5rem",
              color: "#DF2E38",
              fontWeight: 700,
            }}
          >
            2
          </Typography>
        </CardActions>
        <Card sx={{ maxWidth: 300, height: "340px", marginTop: "40px" }}>
          {/* <CardActionArea> */}
          <CardMedia
            component="img"
            height="200"
            image={
              servicesList.length > 0 &&
              servicesList[1] &&
              servicesList[1].images &&
              servicesList[1].images[0]
            }
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Legacy of 6 Years in the travel industry with Excellent relation
              with Customers, vendors & service providers
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>
        <CardActions sx={{ alignItems: "flex-start" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{
              fontSize: "2.5rem",
              color: "#DF2E38",
              fontWeight: 700,
            }}
          >
            3
          </Typography>
        </CardActions>
        <Card sx={{ maxWidth: 300, height: "340px" }}>
          {/* <CardActionArea> */}
          <CardMedia
            component="img"
            height="200"
            image={
              servicesList.length > 0 &&
              servicesList[2] &&
              servicesList[2].images &&
              servicesList[2].images[0]
            }
            alt="green iguana"
          />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              Dynamic Management & Board of Directors with excellent long term &
              short-term vision to innovate new products & services and create
              new benchmarks in the industry
            </Typography>
          </CardContent>
          {/* </CardActionArea> */}
        </Card>
        <CardActions sx={{ alignItems: "flex-end" }}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            sx={{ fontSize: "2.5rem", color: "#DF2E38", fontWeight: 700 }}
          >
            4
          </Typography>
        </CardActions>
        <Card sx={{ maxWidth: 300, height: "340px", marginTop: "40px" }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="200"
              image={
                servicesList.length > 0 &&
                servicesList[3] &&
                servicesList[3].images &&
                servicesList[3].images[0]
              }
              alt="green iguana"
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Dynamic Management & Board of Directors with excellent long term
                & short-term vision to innovate new products & services and
                create new benchmarks in the industry
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </Box>
  );
};

export default SectionWhyShiro;
