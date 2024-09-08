import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import './Signup.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const registerUser = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/register', {
        email: email,
        name: name,
        password: password
        
      });

      navigate("/dashboard");
    } catch (error) {
      if (error.response && error.response.status === 401) {
        alert("Invalid credentials");
      } else {
        // Handle other types of errors
        console.error("An error occurred:", error.message);
      }
    }
  };

  return (
    <div className="skibidi">
      <div className="signup-box">
        <div className= "signup-header">
          <header>Sign Up</header>
        </div>
        <div className = "input-box">
          <input
          type = "text"
          className = "input-field"
          placeholder = "Name"
          autoComplete='off'
          value = {name}
          onChange = {(e)=> setName(e.target.value)}
          />
          <input
          type = "text"
          className = "input-field"
          placeholder = "Email"
          autoComplete='off'
          value = {email}
          onChange = {(e)=> setEmail(e.target.value)}
          />
          <input
          type = "password"
          className = "input-field"
          placeholder = "Password"
          autoComplete='off'
          value = {password}
          onChange = {(e)=> setPassword(e.target.value)}
          />
          <div className = "submit-button-field">
            <button className="submit-button" type = "button" id = "submit" onClick = {registerUser}></button>
            <label for = "submit">Register</label>
          </div>
          <div className="sign-in-link">
            <p>Already have an account? <a href = "/signin"> Login</a></p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;
