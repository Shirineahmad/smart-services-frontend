import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { Typography,Container } from "@mui/material";
 import { Link } from "react-router-dom";
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
     
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const Footer = () => {
  
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        // padding: "5px",
        backgroundColor: "#ddf7e3",
        listStyle: "none",
        alignItems: "center",
        py: 3,
        px: 2,
       
      }}
    >
      <Container
        maxWidth="md"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center"
        }}
      >
        <Stack
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#DF2E38",
                justifyContent: "center",
                listStyle: "none",
                color: "#df2e38",
              }}
            />
          }
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ color: "#5D9C59" }}
        >
          <Link
            to="/"
            style={{
              color: "#5D9C59",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Language Exam
          </Link>
          <Link
            to="/"
            style={{
              color: "#5D9C59",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Flight
          </Link>
          <Link
            to="/"
            style={{
              color: "#5D9C59",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Visa
          </Link>

          <Link
            to="/"
            style={{
              color: "#5D9C59",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Insurance
          </Link>
        </Stack>
        <Skeleton
          animation="wave"
          width="80%"
          style={{
            marginBottom: 6,
            alignItems: "center",
            height: "3px",
            backgroundColor: "#DF2E38",
            marginTop: 6,
          }}
        />
        <Stack
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#DF2E38",
                justifyContent: "center",
                listStyle: "none",
                color: "#df2e38",
              }}
            />
          }
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ color: "#5D9C59" }}
        >
          <Link
            to="/"
            style={{
              color: "#5D9C59",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            About Us
          </Link>

          <Link
            to="/"
            style={{
              color: "#5D9C59",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Contact Us
          </Link>

          <Link
            to="/"
            style={{
              color: "#5D9C59",
              textAlign: "center",
              textDecoration: "none",
            }}
          >
            Services
          </Link>
        </Stack>
        <Skeleton
          animation="wave"
          width="60%"
          style={{
            marginBottom: 6,
            alignItems: "center",
            height: "3px",
            backgroundColor: "#DF2E38",
            marginTop: 6,
          }}
        />
        <Stack
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#DF2E38",
                justifyContent: "center",
                listStyle: "none",
                color: "#df2e38",
              }}
            />
          }
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{ color: "#5D9C59" }}
        >
          <li>
            <FacebookIcon />
          </li>

          <li>
            <InstagramIcon />
          </li>
          <li>
            <LinkedInIcon />
          </li>
        </Stack>
        <Skeleton
          animation="wave"
          width="40%"
          style={{
            marginBottom: 6,
            alignItems: "center",
            height: "3px",
            backgroundColor: "#DF2E38",
            marginTop: 6,
          }}
        />
        <Stack
          divider={
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                backgroundColor: "#DF2E38",
                justifyContent: "center",
                listStyle: "none",
                color: "#df2e38",
              }}
            />
          }
          direction={{ xs: "column", sm: "row" }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            color: "#5D9C59",
          }}
        >
          <li
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <LocalPhoneIcon />
            0096176056979
          </li>

          <li
            style={{
              textDecoration: "none",
              display: "flex",
              flexDirection: "row",
              textAlign: "center",
              justifyContent: "center",
              marginTop: "10px",
            }}
          >
            <MailOutlineIcon />
            shiroGroup@gmail.com
          </li>
        </Stack>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Box>
  );
};

export default Footer;
