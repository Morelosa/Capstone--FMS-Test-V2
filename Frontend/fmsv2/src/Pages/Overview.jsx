import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import BGImage from "../Components/Assets/SBP1.png"

function Overview() {
  return (
   <>
   <Navbar/>
  <Hero 
  // cName is to change the heigth of the background look at heroStyle
    cName="hero-mid"
    heroImg={BGImage}
    title="Overview"
    text=""
  />
   </>
  );
}

export default Overview;