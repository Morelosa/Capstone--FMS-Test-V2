import React, {useState, useRef, useEffect} from 'react'; 
import './Style.css';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

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
    <div className='wp_bkg'>
    <div className="container">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input 
            type = "email"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
            className="email-input"
           />
        </div>
  
        <div className="form-group password-group">
          <label>Password</label>    </div>
          <div className="password-input-wrapper">
              <input
                  type={isPasswordVisible ? "text" : "password"}
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
              />
              <span
                  className="password-toggle"
                  onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                  {isPasswordVisible ? (
                      // Inline SVG for eye-slash icon
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye-slash"
                          viewBox="0 0 16 16"
                      >
                          <path d="M10.5 5a2.5 2.5 0 0 0-4.9 0A2.5 2.5 0 0 0 10.5 5z" />
                          <path d="M1 8s3-6 7-6 7 6 7 6-3 6-7 6-7-6-7-6zm7 4a4 4 0 0 1 0-8 4 4 0 0 1 0 8z" />
                      </svg>
                  ) : (
                      // Inline SVG for eye icon
                      <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-eye"
                          viewBox="0 0 16 16"
                      >
                          <path d="M16 8s-3-6-8-6-8 6-8 6 3 6 8 6 8-6 8-6zm-8 3a3 3 0 1 1 0-6 3 3 0 0 1 0 6z" />
                          <path d="M6.5 8a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z" />
                      </svg>
                  )}
              </span>
        </div>
        <button className='btn btn-primary' type = "button" onClick = {logInUser}>
          Sign In
        </button>

      </form>
      <div style={{ marginTop: '20px' }}> 
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
    </div>
  );

}

export default LoginPage;
