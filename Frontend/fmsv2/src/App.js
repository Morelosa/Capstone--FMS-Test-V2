/**This page is where all the page routing wil go.
 * For organization sake, each of the pages we make should go into the pages section to make it easy to naviage.
 * To connect the pages together, you'll need to make a router on this page for all other pages.
 * No pages should be made on here, they should be made on seperate files for modularity.
 * The other comments should show you how the frontend should connect to the backend. If you need more help,
 * let me know.
 * Asides from that, you have free reign on how to code the project. If you need help with anything, let me know.
 * -Antonio Morelos
 * 
 */
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home"; 
import ExercisesComponents from './Pages/ExercisesComponents';
import Signin from './Pages/Signin';                               
import Signup from './Pages/Signup';
import StartTest from './Pages/StartTest';
import MyAccount from './Pages/Myaccount';
import Dashboard from './Pages/Dashboard';
import DeepSquatTutorial from './Pages/DeepSquatTutorial'; // Import the DeepSquatTutorial component
import HurdleStepTutorial from './Pages/HurdleStepTutorial'; // Import the HurdleStepTutorial component
import InLineLunge from './Pages/InLineLunge'; // Import the InLineLunge component
import ShoulderMobility from './Pages/ShoulderMobility'; // Import the ShoulderMobility component
import ActiveStraightLegRaise from './Pages/ActiveStraightLegRaise'; // Import the Active Straight Leg Raise component
import TrunkStabilityPushUp from './Pages/TrunkStabilityPushUp'; 
import RotaryStability from './Pages/RotaryStability'; 
import TestResult from './Pages/TestResult';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function App() {
  const loggedIn = localStorage.getItem("login");

  return(
    <div className='="App'>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path= "/ExercisesComponents" element={loggedIn?<ExercisesComponents/>: <Signin/>}/>
        <Route path='/signin' element={loggedIn?  <Dashboard />: <Signin/>}/>
        <Route path='/signup' element={loggedIn?  <Dashboard /> : <Signup/>}/>
        <Route path="/StartTest" element={loggedIn? <StartTest /> : <Signin/>} />
        <Route path="/TestResult" element={loggedIn? <TestResult /> : <Signin/>} />
        <Route path="/deep-squat-tutorial" element={loggedIn? <DeepSquatTutorial /> : <Signin/>} /> {/* Add route for Deep Squat tutorial page */}      
        <Route path="/Hurdle-step-tutorial" element={loggedIn? <HurdleStepTutorial /> : <Signin/>} /> {/* Add route for Hurdle Step tutorial page */}  
        <Route path="/Inline-lunge-tutorial" element={loggedIn? <InLineLunge /> : <Signin/>} /> {/* Add route for Inline Lunge tutorial page */}   
        <Route path="/shoulder-mobility-tutorial" element={loggedIn? <ShoulderMobility /> : <Signin/>} /> {/* Add route for shoulder mobility tutorial page */}    
        <Route path="/active-straight-leg-raise-tutorial" element={loggedIn? <ActiveStraightLegRaise /> : <Signin/>} />
        <Route path="/trunk-stability-push-up-tutorial" element={loggedIn? <TrunkStabilityPushUp /> : <Signin/>} />
        <Route path="/rotary-stability-tutorial" element={loggedIn? <RotaryStability /> : <Signin/>} />
        <Route path="/Dashboard" element={ loggedIn ? <Dashboard /> : <Signin/>} />
        <Route path="/MyAccount" element={loggedIn? <MyAccount /> : <Signin/>} />
        

        </Routes>
      
    </div>
  )
}




// import './App.css';....OLDER VERSION
// import Navbar from './Components/Navbar/Navbar';
// import { BrowserRouter,Routes,Route } from "react-router-dom";
// import HomeCategory from "./Pages/HomeCategory";
// import Home from "./Pages/Home";
// import Product from "./Pages/Product";
// import Signin from "./Pages/Signin";
// import Signup from "./Pages/Signup";



// function App() {

//   return (
   
//     <div>
//       <BrowserRouter>
//       <Navbar/>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/overview' element={<HomeCategory category="overview"/>}/>
//         <Route path='/exercises' element={<HomeCategory category="exercises"/>}/>
//         <Route path='/tutorials' element={<HomeCategory category="tutorials"/>}/>
//         <Route path="product" element={<Product/>}>
//           <Route path=":productId" element={<Product/>}/>
//         </Route>
//         <Route path='/Signin' element={<Signin/>}/>
//         <Route path='/Signup' element={<Signup/>}/>
//       </Routes>
//       </BrowserRouter>
     
//     </div>
//   );
// }
// export default App;

