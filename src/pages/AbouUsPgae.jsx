import React from "react";
import { Container, Typography, Paper, Grid, Button } from "@mui/material";

const AboutUsPage = () => {
  return (
    <Container maxWidth="lg" sx={{ marginTop: 4 }}>
      <Typography variant="h2" align="center" sx={{ marginBottom: 4 }}>
        About Us
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>
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
            <Typography variant="h4" gutterBottom>
              Our Team
            </Typography>
            <Typography>
              Meet our dedicated team of professionals who are passionate about
              what they do.
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Button variant="contained" color="primary" sx={{ marginTop: 4 }}>
        Contact Us
      </Button>
    </Container>
  );
};

export default AboutUsPage;
