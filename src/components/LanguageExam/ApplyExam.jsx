import React from 'react'
import {
  Grid,
  Paper,
  Typography,
  Container,
  FormControl,
  Select,
  OutlinedInput,
  Box,
  MenuItem,
  Button,
} from "@mui/material";
const ApplyExam = () => {
    const [pdf, setPdf] = React.useState([]);
  const handleFileUpload = (e) => {
    const newImages = e.target.files[0];

    if (newImages) {
      setPdf(  newImages);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 0 }}>
      <Grid container spacing={3} sx={{ width: "100%" }}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: "#DF2E38",
              width: "100%",
            }}
          >
            <form onSubmit="#">
              <FormControl
                sx={{
                  m: 1,
                  width: "100%",
                  mt: 3,
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "10px",
                }}
              >
                <Typography variant="h6" sx={{ color: "white" }}>
                  {" "}
                  Apply Now
                </Typography>
                <Select
                  displayEmpty
                  value="#"
                  onChange="#"
                  input={<OutlinedInput />}
                  renderValue={(selected) => {
                    if (selected.length === 0) {
                      return <em>Select type visa</em>;
                    }

                    return selected;
                  }}
                >
                 
                      <MenuItem >
                       1
                      </MenuItem>
                 
                </Select>

               
                <Box>
                  
                
                  <input
                    type="file"
                    accept="application/pdf"
                    onChange={handleFileUpload}
                    name="passport"
                  />{" "}
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    columnGap: "10px",
                    justifyContent: "space-around",
                    textAlign: "center",
                    alignItems: "center",
                  }}
                >
                  <Button
                    type="submit"
                    sx={{
                      width: "80px",
                      height: "40px",
                      borderRadius: "4px", // Corrected the typo here
                      color: "white",
                      borderColor: "#DF2E38",
                      backgroundColor: "#DF2E38",
                      "&:hover": {
                        backgroundColor: "#5D9C59",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Box>
              </FormControl>
            </form>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ApplyExam