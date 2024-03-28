import React from "react";
import Navbar from "../Components/Navbar/Navbar";
import Hero from "../Components/Hero/Hero";
import BGImage from "../Components/Assets/SBP1.png"
 import ExercisesComponents from "../Components/ExerisessComponents";

function Exercises() {
  return (
   <>
   <Navbar/>
   <Hero 
    cName="hero-mid"
    heroImg={BGImage}
    title="Exercises"
    // text=""
  />
  <ExercisesComponents/> 
   </>
  );
}

export default Exercises;