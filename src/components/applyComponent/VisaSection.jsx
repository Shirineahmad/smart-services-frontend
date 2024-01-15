import React from "react";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { countries } from "../../countries";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import TextField from "@mui/material/TextField";
import axios from "axios";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

// const userId = localStorage.getItem("userId");
//  const token = localStorage.getItem('token');
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = ["Adult", "Child", "Infant"];

const VisaSection = () => {
  const [way, setWay] = React.useState("");
  const [leavingFrom, setLeavingFrom] = React.useState("");
  const [arriving, setArriving] = React.useState("");
  const [leavingDate, setLeavingDate] = React.useState(null);
  const [arrivingDate, setArrivingDate] = React.useState(null);
  const [classFlight, setClassFlight] = React.useState("");
  const [images, setImages] = React.useState([]);
  const [travelers, setTravelers] = React.useState({
    Adult: 0,
    Child: 0,
    Infant: 0,
  });
  const [additionalComment, setAdditionalComment] = React.useState("");
  const [error, setError] = React.useState(null);

  const handleLeaving = (event) => {
    setLeavingFrom(event.target.value);
  };

  const handleArriving = (event) => {
    setArriving(event.target.value);
  };
  const handleClass = (event) => {
    setClassFlight(event.target.value);
  };
  const handleLeavingDateChange = (date) => {
    // Handle changes in leavingDate
    setLeavingDate(date);
  };

  const handleArrivingDateChange = (date) => {
    // Handle changes in arrivingDate
    setArrivingDate(date);
  };
  const handleChangeChip = (event) => {
    const selectedTravelers = event.target.value;

    // Update the state with the selected travelers
    const updatedTravelers = {};
    selectedTravelers.forEach((item) => {
      updatedTravelers[item.name] = item.count;
    });

    setTravelers(updatedTravelers);
  };

  const validateInput = () => {
    if (!way) {
      setError("Choose way is required.");
      return false;
    }
    if (!leavingFrom) {
      setError("leavingFrom is required.");
      return false;
    }

    if (!arriving) {
      setError("arriving is required.");
      return false;
    }
    if (!classFlight) {
      setError("classFlight is required.");
      return false;
    }
    if (!travelers) {
      setError("travelers is required.");
      return false;
    }

    return true;
  };
  React.useEffect(() => {
    console.log("Updated travelers:", travelers);
  }, [travelers]);
  // const handleImageChange = async (event) => {
  //   const selectedImages = Array.from(event.target.files);

  //   // Create an array of promises for uploading each file
  //   const uploadPromises = selectedImages.map(async (file) => {
  //     // Your logic for uploading the file and getting the download URL
  //     const downloadURL = await uploadFileAndGetURL(file);
  //     return downloadURL;
  //   });

  //   // Wait for all uploads to complete
  //   const uploadedFiles = await Promise.all(uploadPromises);

  //   // Update the passport array with download URLs
  //   setImages(uploadedFiles);
  // };

  // const uploadFileAndGetURL = async (file) => {
  //   // Your logic for uploading the file and getting the download URL
  //   const response = await axios.post("your_upload_url", file);
  //   return response.data.downloadURL; // Adjust this based on your server's response
  // };

  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      return;
    }

    try {
      const file = document.getElementById("fileInput").files[0]; // Assuming you have an input field with id="fileInput"
      const formData = new FormData();
      formData.append("passport", file);

      const imageResponse = await axios.post(
        "http://localhost:8000/submissionFlight/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${"your_access_token"}`, // Replace with your actual access token
          },
        }
      );

      const imageUrl = imageResponse.data.data.url;
      setImages([imageUrl]);

      // Continue with the rest of your logic (flight submission or any other actions)
      const newFlight = {
        userId: "658f4da73a6841f3bcd1ba6f",
        type: way,
        leavingFrom: leavingFrom,
        goingTo: arriving,
        leavingDate: leavingDate.toISOString(),
        arrivingDate: arrivingDate.toISOString(),
        classFlight: classFlight,
        travelers: travelers,
        additionalComment: additionalComment,
        passport: images,
      };

      const flightResponse = await axios.post(
        "http://localhost:8000/submissionFlight/create",
        { newFlight },
        {
          headers: {
            Authorization: `Bearer ${"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGY0ZGE3M2E2ODQxZjNiY2QxYmE2ZiIsInJvbGUiOiJjbGllbnQiLCJpYXQiOjE3MDUzMTQ0MjEsImV4cCI6MTcwNTMxODAyMX0.duFiLzLW0A_DbnlRkTwFKXY3wQN9nN0HT3GfUspH91E"}`,
          },
        }
      );

      console.log("After submitting:", flightResponse.data);

      // Reset form fields and state
      setWay("");
      setLeavingFrom("");
      setArriving("");
      setClassFlight("");
      setTravelers({
        Adult: 0,
        Child: 0,
        Infant: 0,
      });
      setAdditionalComment("");
      setImages([]);
    } catch (error) {
      console.error("Error creating order:", error.message);
    }
  };

  console.log("travelers", travelers);

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
            value={leavingFrom}
            onChange={handleLeaving}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Leaving From</em>;
              }

              return selected;
            }}
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
      </FormControl>
    </form>
  );
};

export default VisaSection;
