import React, {useState} from 'react'; 
import "./Signin.css";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const getUser = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/@me", {
        email: localStorage.getItem("email")
      });
      // Check if response status is 200 (OK)
      if (response.status === 200) {
        // Redirect user to dashboard upon successful login
        localStorage.setItem("name", response.data.name);

      } else {
        // Handle other response statuses
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } 
  };

  const logInUser = async () => {
    if(email.length === 0){
      alert("Email has been left blank!");
    }
    else if (password.length ===0){
      alert("Email has been left blank!")
    }
    else{
      try {
        const response = await axios.post("http://127.0.0.1:5000/login", {
          email: email,
          password: password
        });
        
        // Check if response status is 200 (OK)
        if (response.status === 200) {
          // Redirect user to dashboard upon successful login
          localStorage.setItem("email", response.data.email);
          localStorage.setItem("login", true);
          getUser();
          navigate("/dashboard");
          window.location.reload();
        } else {
          // Handle other response statuses
          console.log("Unexpected response status:", response.status);
        }
      } catch (error) {
        console.error("Error occurred during login:", error);
    
        // Check if error response status is 401 (Unauthorized)
        if (error.response && error.response.status === 401) {
          alert("Invalid credentials");
        } else {
          // Handle other error cases
          alert("An error occurred during login");
        }
      }
    }
    
  };

  return (
    <div className = "skibidi">
      <div className = "login-box">
        <div className = "login-header">
          <header>Login</header>
        </div>
        <div className = "input-box">
          <input
          type = "Text" 
          className = "input-field" 
          placeholder = "Email" 
          autocomplete = "off"
          value = {email}
          onChange = {(e) => setEmail(e.target.value)} 
          required
          />
          <div className = "input-box">
            <input
            className = "input-field"
            type = "password"
            placeholder = "Password"
            autocomplete = "off"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            />
          </div>
          {/* 
          <div className="forgot">
            <section>
              <input type="checkbox" id = "check"/>
              <label for = "check">Remember Me</label>
            </section>
            <section>
              <a href = "/blah">Forgot Password</a>
            </section>
          </div>
          */}
          <div className="submit-button-field">
            <button className="submit-button" type = "button" id = "submit" onClick = {logInUser}></button>
            <label for = "submit">Sign In</label>
          </div>
          <div className="sign-up-link">
            <p>Don't have an account? <a href = "/signup"> Sign Up</a></p>
          </div>
        </div>
      </div>
    </div>
    
  );

}

export default LoginPage;
