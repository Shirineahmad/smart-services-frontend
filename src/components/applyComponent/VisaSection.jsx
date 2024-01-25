import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { countries } from "../../countries";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import axios from "axios";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import { useNavigate } from "react-router-dom";



const VisaSection = () => {
  const [error, setError] = React.useState(null);
  const [country, setCountry] = React.useState("");
   const [showError, setShowError] = React.useState(false);
    const navigate = useNavigate();
  const handleLeaving = (event) => {
    setCountry(event.target.value);
  };

  const validateInput = () => {
    if (!country) {
      setError("travelers is required.");
      return false;
    }
    return true;
  };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      setShowError(true);
      return;
    }
    try {
      const response = await axios.get(
        `http://127.0.01:8000/visa/getByCountryName/${country}`
      );
       const responseInformation = await axios.get(
         `http://127.0.01:8000/country/getByName/${country}`
       );
      console.log("visa1", response.data);
console.log("rsponse", responseInformation.data);
      if (response.data.success && responseInformation.data.success) {
        
        console.log("visa2", response.data.data);
 console.log("responseInformation to be sent:", responseInformation.data.data);
        // Navigate to the "visa" page with the visa information
        navigate("/visa", {
          state: {
            visaData: response.data.data,
            countryInformation: responseInformation.data.data,
          },
        });
        console.log(
          "responseInformation to be sent:",
          responseInformation.data.data
        );
      } else {
        console.error("Error fetching visa country:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching visa country:", error.message);
    }
  };

  return (
    <form
      onSubmit={handleConfirm}
      sx={{ alignItems: "center", display: "flex", justifyContent: "center" }}
    >
      <FormControl
        sx={{
          m: 1,
          width: "100%",
          mt: 3,
          display: "flex",
          flexDirection: "column",
          rowGap: "10px",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            columnGap: "20px",
            alignItems: "center",
            marginRight: "15px",
            justifyContent: "center",
          }}
        >
          <Select
            displayEmpty
            value={country}
            onChange={handleLeaving}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Leaving From</em>;
              }

              return selected;
            }}
            MenuProps
          >
            {countries.map((country) => (
              <MenuItem key={country} value={country}>
                {country}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Button
          type="submit"
          sx={{
            width: "80px",
            height: "40px",
            borderRaduis: "4px",
            color: "white",
            borderColor: "#DF2E38",
            backgroundColor: "#DF2E38",
            "&:hover": {
              backgroundColor: "#5D9C59", // Change to the desired hover color
            },
          }}
        >
          Search
        </Button>
        {showError && (
          <Dialog open={showError} onClose={() => setShowError(false)}>
            <DialogTitle>Error</DialogTitle>
            <DialogContent>
              <DialogContentText>{error}</DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setShowError(false)} color="primary">
                Close
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </FormControl>
    </form>
  );
};

export default VisaSection;
