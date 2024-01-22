import React from 'react'
import Header from "../components/homeComponent/Header";
import Footer from "../components/homeComponent/Footer";
import CareExam from "../images/home4.jpg"
import HeroLanguageExam from '../components/LanguageExam/HeroLanguageExam';
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
          src={CareExam}
          alt="idk"
          style={{
            width: "100%",
            height: "70vh",
            objectFit: "cover",
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
      <HeroLanguageExam/>
      <Footer />
    </div>
  );
}

export default LanguageExam