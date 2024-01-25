import React from 'react'
import Container from "@mui/material/Container";
import {
  Grid,
  Paper,
  Box,
  Button,
  FormControl,
  OutlinedInput,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
const ApplyVisa = ({ visaData }) => {
  console.log("in apply",visaData)
   const [images, setImages] = React.useState([]);
   const [travelers, setTravelers] = React.useState({
     Adult: 0,
     Child: 0,
     Infant: 0,
   });
  const names = ["Adult", "Child", "Infant"];
  const [error, setError] = React.useState(null);
  const [visaId, setVisaId] = React.useState("")
  const handleChangeChip = (event) => {
    const selectedTravelers = event.target.value;

    // Update the state with the selected travelers
    const updatedTravelers = {};
    selectedTravelers.forEach((item) => {
      updatedTravelers[item.name] = item.count;
    });

    setTravelers(updatedTravelers);
  };
  

  const handleFileUpload = (e) => {
    const newFile = e.target.files[0];

    if (newFile) {
      setImages((prevImages) => [...prevImages,newFile]);
    }
  };

  

   const validateInput = () => {
     if (!visaId) {
      console.log("visaId",visaId);
       setError("Choose way is required.");
       return false;
     }
     if (images.length===0) {
      setError("files is required.");
        console.log("images", images);
      return false;
    }
     if (!travelers) {
       setError("travelers is required.");
        console.log("travelers", travelers);
       return false;
     }
    
     return true;
  };
    const handleVisaType = (event) => {
    setVisaId(event.target.value);
  };
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const handleConfirm = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      console.log(error)
      return;
    }
console.log("userId", userId);
console.log("visaId", visaId);

console.log("images", images);
console.log("travelers", travelers);

    
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("visaId", visaId);
     formData.append("statusVisa", "pending");

    
      images.forEach((image) => {
        formData.append(`documents`, image);
      });

    Object.entries(travelers).forEach(([key, value]) => {
      formData.append(`person[${key}]`, value);
    });


      console.log("formData", formData);

      const flightResponse = await axios.post(
        "http://localhost:8000/submissionVisa/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("After submitting:", flightResponse.data);

      // Reset form fields and state
      setVisaId("");
      setTravelers({
        Adult: 0,
        Child: 0,
        Infant: 0,
      });
      setImages([]); // Reset the images array to an empty array
    } catch (error) {
      console.error("Error creating order:", error.message);
      if (error.response) {
        // The request was made and the server responded with a status code
        console.error("Detailed error response:", error.response.data);
        console.error("Status code:", error.response.status);
      } else if (error.request) {
        // The request was made but no response was received
        console.error("No response received");
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error:", error.message);
      }
    }
  };


  return (
    <div>
      <Container maxWidth="lg" sx={{ mb: 4, ml: 0 }}>
        <Grid container spacing={3} sx={{ width: "100%" }}>
          {/* Chart */}
          <Grid item xs={12} md={8} lg={9}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: "100%",
                backgroundColor: "white",
                width: "50vh",
              }}
            >
              <form onSubmit={handleConfirm}>
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
                  <Typography variant="h6" sx={{ color: "#DF2E38" }}>
                    {" "}
                    Apply Now
                  </Typography>
                  <Select
                    displayEmpty
                    value={visaId}
                    onChange={handleVisaType}
                    input={<OutlinedInput />}
                    renderValue={(selected) => {
                      if (selected.length === 0) {
                        return <em>Select type visa</em>;
                      }

                      // Find the corresponding visa title based on selected _id
                      const selectedVisa = visaData.find(
                        (visa) => visa._id === selected
                      );
                      return selectedVisa ? selectedVisa.title : "";
                    }}
                  >
                    {visaData &&
                      visaData.length > 0 &&
                      visaData.map((visa) => (
                        <MenuItem key={visa._id} value={visa._id}>
                          {visa.title}
                        </MenuItem>
                      ))}
                  </Select>
                  <Box>
                    <Select
                      multiple
                      displayEmpty
                      value={Object.keys(travelers).map((name) => ({
                        name,
                        count: travelers[name],
                      }))}
                      onChange={handleChangeChip}
                      input={<OutlinedInput />}
                      renderValue={(selected) => {
                        if (selected.length === 0) {
                          return <em>Placeholder</em>;
                        }
                        return selected
                          .map((item) => `${item.name}: ${item.count}`)
                          .join(", ");
                      }}
                    >
                      <MenuItem disabled value="">
                        <em>Select Travelers</em>
                      </MenuItem>
                      {names.map((name) => (
                        <MenuItem
                          key={name}
                          value={{ name, count: travelers[name] }}
                          style={{
                            textAlign: "start",
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "start",
                            columnGap: "4px",
                            alignItems: "start",
                          }}
                        >
                          {name === "Adult"
                            ? "Adult (12 Years +)"
                            : name === "Child"
                            ? "Child (2-12 Years)"
                            : name === "Infant"
                            ? "Infant (0-2 Years)"
                            : name}
                          <div
                            style={{
                              textAlign: "start",
                              display: "flex",
                              flexDirection: "row",
                              justifyContent: "center",
                              columnGap: "4px",
                            }}
                          >
                            <input
                              type="number"
                              value={travelers[name]}
                              onChange={(e) => {
                                const updatedCount =
                                  parseInt(e.target.value, 10) || 0;
                                const updatedTravelers = {
                                  ...travelers,
                                  [name]: Math.max(updatedCount, 0), // Ensure the value is not negative
                                };
                                setTravelers(updatedTravelers);
                              }}
                              style={{
                                width: "40px",
                                height: "27px",
                                borderRadius: "4px",
                                textAlign: "center",
                              }}
                              min="0" // Set the minimum allowed value to 0
                            />
                          </div>
                        </MenuItem>
                      ))}
                    </Select>
                    <Typography>Please apply all documents here</Typography>
                    <input
                      type="file"
                      accept="application/pdf"
                      onChange={handleFileUpload}
                    />
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
    </div>
  );
}

export default ApplyVisa