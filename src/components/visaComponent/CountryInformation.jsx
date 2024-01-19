import React from 'react'
import Container from '@mui/material/Container';
import { Grid, Typography, Paper } from "@mui/material";

const CountryInformation = ({ countryData }) => {
  console.log("visaInfo", countryData);

  return (
    <div>
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 0 }}>
        <Grid container spacing={3}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 140,
              }}
            >
              <Typography variant="h6" color="#DF2E38">
                Country Informations
              </Typography>

              <Typography>
                Description: {countryData.countryDescription}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};


export default CountryInformation