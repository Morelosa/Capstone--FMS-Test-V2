import React, { useState } from "react";
import logo from './logo.svg';
import './App.css';
import { Login } from "./Login";
import { SignUp } from "./SignUp";

function App() {
  const [currentForm, setcurrentForm] = useState('Login');

  const toggleForm = (formName) => {
    setcurrentForm(formName);
  }

  return (
    <div className="App">
      {
        currentForm === "Login" ? <Login onFormSwitch={toggleForm} /> : <SignUp onFormSwitch={toggleForm} />
      }
    </div>
  );
}
export default App;
