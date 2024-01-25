import React from 'react'
import Header from "../components/homeComponent/Header";
import Footer from "../components/homeComponent/Footer";
import HeroLanguageExam from '../components/LanguageExam/HeroLanguageExam';
import HeroPhoto from "../images/languageExam.jpg";
import {
  Typography,
  Box,
} from "@mui/material";

const LanguageExam = () => {
  
  return (
    <div>
      {" "}
      <Header />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
        }}
      >
        
          <img
            src={HeroPhoto}
            alt="idk"
            style={{
              width: "100%",
              height: "70vh",
              objectFit: "cover",
              marginTop:"80px"
            }}
          />
     

        <Typography
          variant="h4"
          sx={{
            position: "absolute",
            fontFamily: "popins",
            color: "#FFFFFF",
            fontWeight: "bold",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            textAlign: "center",
          }}
        >
          Language Exam
        </Typography>
      </Box>
      <HeroLanguageExam />
      <Footer />
    </div>
  );
}

export default LanguageExam