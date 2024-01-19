import React from 'react'
import Header from "../components/homeComponent/Header"
import HeroVisa from '../components/visaComponent/HeroVisa'
import CountryInformation from '../components/visaComponent/CountryInformation'
import { useLocation } from "react-router-dom";
import VisaType from '../components/visaComponent/VisaType';
const VisaPage = () => {
    const location = useLocation();
    const visaData = location.state?.visaData;
    const countryInformation = location.state?.countryInformation;
   console.log("c:", visaData[0].countryName);
   console.log("c:", visaData);
   console.log("countryInformation", countryInformation);
  return (
    <div>
      <Header />
      <HeroVisa countryName={visaData[0].countryName} />
      <CountryInformation countryData={countryInformation} />
      <VisaType/>
    </div>
  );
}

export default VisaPage