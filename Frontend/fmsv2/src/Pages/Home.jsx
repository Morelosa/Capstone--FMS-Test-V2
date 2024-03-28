// this is what the home page is going to look like

import Hero from "../Components/Hero/Hero";
import Navbar from "../Components/Navbar/Navbar";
import BGImage from "../Components/Assets/SBP1.png"

 function Home () {
        return (
         <>
         <Navbar />
           <Hero 
           cName="hero"
           heroImg={BGImage}
           title="FMS Test"
           text= "Functional Movement Screen Test"/>
                </>
               );
        }

 export default Home;





// import React from "react";....OLDER VERSION
// import Hero from "../Components/Hero/Hero";
// ;

// const Home = () => {
//     return (
//         <div>
//             <Hero/>
//         </div>
//     )

// }

// export default Home