import React from "react";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";
import Header from "../components/homeComponent/Header"
import Footer from "../components/homeComponent/Footer";
import {Link} from "react-router-dom"
const AboutUsPage = () => {
  return (
    <div>
      <Header />
      <Container maxWidth="lg" sx={{ marginTop: "150px" }}>
        <Typography
          variant="h2"
          align="center"
          sx={{ marginBottom: 4, color: "#DF2E38" }}
        >
          About Us
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" sx={{ color: "#DF2E38" }} gutterBottom>
                Our Mission
              </Typography>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque
                nec ex at lacus sagittis congue sed vel arcu.
              </Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper elevation={3} sx={{ padding: 3 }}>
              <Typography variant="h4" sx={{ color: "#DF2E38" }} gutterBottom>
                Our Team
              </Typography>
              <Typography>
                Meet our dedicated team of professionals who are passionate
                about what they do.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
        <Link to="/ContactUs">
          <Button
            variant="contained"
            sx={{
              marginTop: 4,
              color: "white",
              backgroundColor: "#DF2E38",
              "&:hover": {
                backgroundColor: "#5D9C59",
              },
            }}
          >
            Contact Us
          </Button>
        </Link>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
