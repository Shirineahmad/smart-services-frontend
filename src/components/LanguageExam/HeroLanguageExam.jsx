import React from "react";
import {
  Container,
  Paper,
  OutlinedInput,
  Select,
  MenuItem,
  Grid,
  Typography,
  Box,
  Button,
  TextField,
} from "@mui/material";

import { useEffect } from "react";
import axios from "axios";

const HeroLanguageExam = () => {
  const [exams, setExams] = React.useState([]);
  const [languages, setLanguages] = React.useState([]);
  const [language, setLanguage] = React.useState("");
  const [institutes, setInstitutes] = React.useState([]);
  const [institute, setInstitute] = React.useState("");
  const [levels, setLevels] = React.useState([]);
  const [level, setLevel] = React.useState("");
  const [descriptions, setDescriptions] = React.useState([]);
  const [description, setDescription] = React.useState("");
  const [urgentNumber, setUrgentNumber] = React.useState("");
  const [aditionalComment, setAditionalComment] = React.useState("");
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const [images, setImages] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [additionalComment, setAdditionalComment] = React.useState("");

  useEffect(() => {
    const fetchExam = async () => {
      try {
        const response = await axios.get(
          `https://smart-services-backend-test5.onrender.com/exam/getAll`
        );
        console.log("response.data", response.data.data);
        if (response.data.success) {
          setExams(response.data.data);
          await handleLanguage(response.data.data);
          await handleInstitute(response.data.data);
          await handleLevel(response.data.data);
          await handleDescription(response.data.data);
        } else {
          console.error("Error fetching exams:", response.data.message);
        }
      } catch (error) {
        console.error("Error fetching exams:", error.message);
      }
    };

    fetchExam();
  }, []);
  console.log("exams", exams);
  console.log("languages", languages);
  const handleLanguage = async (exams) => {
    const uniqueLanguages = [...new Set(exams.map((exam) => exam.language))];

    setLanguages(uniqueLanguages);

    console.log("Unique Languages:", uniqueLanguages);
  };
  const handleInstitute = async (exams) => {
    const uniqueInstitut = [...new Set(exams.map((exam) => exam.institute))];

    setInstitutes(uniqueInstitut);

    console.log("Unique Languages:", uniqueInstitut);
  };
  const handleLevel = async (exams) => {
    const uniqueLevel = [...new Set(exams.map((exam) => exam.level))];

    setLevels(uniqueLevel);

    console.log("Unique Languages:", uniqueLevel);
  };

  const handleDescription = async (exams) => {
    const uniqueDescriptions = [
      ...new Set(exams.flatMap((exam) => exam.description)),
    ];
    setDescriptions(uniqueDescriptions);
    console.log("Unique Descriptions:", uniqueDescriptions);
  };

  const handleFileUpload = (e) => {
    const newImages = e.target.files[0];

    if (newImages && images.length < 4) {
      setImages((prevImages) => [...prevImages, newImages]);
    }
  };

  const validateInput = () => {
    if (!language) {
      setMessage("Choose language is required.");
      return false;
    }
    if (!level) {
      setMessage("level is required.");
      return false;
    }

    if (!institute) {
      setMessage("institute is required.");
      return false;
    }
    if (!urgentNumber) {
      setMessage("urgentNumber is required.");
      return false;
    }
    if (!images) {
      setMessage("images is required.");
      return false;
    }

    return true;
  };
  const handleConfirm = async (e) => {
    e.preventDefault();
    if (!validateInput()) {
      console.log("error", message);
      return;
    }
    console.log("images", images);
    try {
      const formData = new FormData();
      formData.append("userId", userId);
      formData.append("level", level);
      formData.append("language", language);
      formData.append("institute", institute);
      formData.append("urgentNumber", urgentNumber);
      formData.append("additionalComment", aditionalComment);
      formData.append("statusExam", "pending");
      // Append each image in the images array to the formData under the 'passport' key
      images.forEach((image) => {
        formData.append(`passport`, image);
      });

      console.log("newExam", formData);
      const examResponse = await axios.post(
        `https://smart-services-backend-test5.onrender.com/submissionExam/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage("submitting suucessfully");
      console.log("After submitting:", examResponse.data);

      // Reset form fields and state
      setLanguage("");
      setLevel("");
      setDescription("");
      setInstitute("");
      setUrgentNumber("");
      setAditionalComment(" ");
      setImages("");
      setMessage("");
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
    <Container
      sx={{
        mt: 4,
        mb: 4,
        ml: 0,
        mr: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      fullWidth
    >
      <form
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignitems: "center",
          width: "100vh",
        }}
        onSubmit={handleConfirm}
      >
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            rowGap: "15px",
            width: "80%",
            // flexDirection: "row",
            backgroundColor: "#ffff", // Set to red color
          }}
        >
          <Typography variant="h6" sx={{ color: "#DF2E38" }}>
            {" "}
            Apply Now
          </Typography>

          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "15px",
            }}
          >
            <Select
              displayEmpty
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Language</em>;
                }

                return selected;
              }}
              fullWidth
            >
              {languages &&
                languages.length > 0 &&
                languages.map((lang) => (
                  <MenuItem value={lang}>{lang}</MenuItem>
                ))}
            </Select>
            <Select
              displayEmpty
              value={institute}
              onChange={(e) => setInstitute(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Institute </em>;
                }

                return selected;
              }}
              fullWidth
            >
              {institutes &&
                institutes.length > 0 &&
                institutes.map((institute) => (
                  <MenuItem value={institute}>{institute}</MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "15px",
            }}
          >
            <Select
              displayEmpty
              value={level}
              onChange={(e) => setLevel(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Level</em>;
                }

                return selected;
              }}
              fullWidth
              MenuProps
            >
              {levels &&
                levels.length > 0 &&
                levels.map((level) => (
                  <MenuItem value={level}>{level}</MenuItem>
                ))}
            </Select>
            <Select
              displayEmpty
              value={description}
              MenuProps
              onChange={(e) => setDescription(e.target.value)}
              input={<OutlinedInput />}
              renderValue={(selected) => {
                if (selected.length === 0) {
                  return <em>Select Description</em>;
                }

                return selected;
              }}
              fullWidth
            >
              {descriptions &&
                descriptions.length > 0 &&
                descriptions.map((desc) => (
                  <MenuItem key={desc} value={desc}>
                    {desc}
                  </MenuItem>
                ))}
            </Select>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: "flex",
              flexDirection: "row",
              columnGap: "15px",
            }}
          >
            {" "}
            <TextField
              type="text"
              name="urgentNumber"
              value={urgentNumber}
              onChange={(e) => setUrgentNumber(e.target.value)}
              placeholder="Urgent Number"
              required
              fullWidth
              sx={{
                "& .css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input:focus":
                  {
                    outlineColor: "red",
                    outline: "1px solid red",
                    border: "1px solid red",
                  },
              }}
            />
            <TextField
              label="Additional Comment"
              variant="filled"
              value={additionalComment}
              fullWidth
              onChange={(e) => setAdditionalComment(e.target.value)}
              placeHolder="Aditional Comment"
            />
          </Grid>
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
            <Box>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileUpload}
                name="passport"
                fullWidth
              />
            </Box>
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
          {message && <p className="error-message">{message}</p>}
        </Paper>

        {/* <Container maxWidth="lg" sx={{ mt: 4, mb: 4, ml: 0 }}>
          <Grid container spacing={3} sx={{ width: "100%" }}>
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
                 
                </FormControl>
              </Paper>
            </Grid>
          </Grid>
        </Container> */}
      </form>
    </Container>
  );
};

export default HeroLanguageExam;
