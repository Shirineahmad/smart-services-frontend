import React from 'react'
import Header from "../components/homeComponent/Header";
import Footer from "../components/homeComponent/Footer";
import HeroLanguageExam from '../components/LanguageExam/HeroLanguageExam';
import {
  Typography,
  Box,
} from "@mui/material";
import { useEffect } from "react";
import axios from "axios";

import { useSelector, useDispatch } from "react-redux";
import { setServicesList } from "../store/sliderSlice";
const LanguageExam = () => {
  const servicesList = useSelector((state) => state.slider.servicesList);
  const dispatch = useDispatch();
  
 useEffect(() => {
   const fetchServices = async () => {
     try {
       const response = await axios.get(
         "http://127.0.01:8000//services/getByName/Language Exams"
       );
       console.log("response.data", response.data);
       if (response.data.success) {
         dispatch(setServicesList(response.data.data));
       } else {
         console.error("Error fetching products:", response.data.message);
       }
     } catch (error) {
       console.error("Error fetching products:", error.message);
     }
   };

   fetchServices();
 }, [dispatch]);
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
      >{servicesList && servicesList.images &&
        <img
          src={servicesList.images[0]}
          alt="idk"
          style={{
            width: "100%",
            height: "70vh",
            objectFit: "cover",
          }}
        />}

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