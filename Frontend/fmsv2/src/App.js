<<<<<<< HEAD
import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { SignUp } from "./SignUp";
=======
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




// import logo from './logo.svg';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
//import Test from './Pages/Test.js';
//app.js linked to navbar.

>>>>>>> ab9124e414dd536a9e9c97ae5ef2e8debdc99d5b

function App() {
  const [currentForm, setcurrentForm] = useState('Login');

  const toggleForm = (formName) => {
    setcurrentForm(formName);
  }

  return (
<<<<<<< HEAD
    <div className="App">
      {
        currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />
      }
=======
    <div>
     <Navbar/>
>>>>>>> ab9124e414dd536a9e9c97ae5ef2e8debdc99d5b
    </div>
  );
}
export default App;


//The following commented code was to test the connectivity of flask to react.
//It was left here as refrence. For info about the <Test/> page, look in the Pages folder.

/*
function App(){
  return(
    <div className = "App">
      <Test/>
    </div>
  );
}
export default App;
*/
