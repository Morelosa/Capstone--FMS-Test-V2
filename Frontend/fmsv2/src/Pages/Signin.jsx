import React, {useState, useRef, useEffect} from 'react'; 
import './Style.css';
import { Link , useNavigate} from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const logInUser = async () => {
    if(email.length ===0){
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
          
          navigate("/dashboard");
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
    <div className="container">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input 
            type = "text"
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
           />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type = "text"
            value = {password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label>User Type</label>
          <select className="form-control">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <Link to="/dashboard" className="btn btn-primary">Sign In</Link>
        <button type = "button" onClick = {logInUser}>
          The REAL Sign In
        </button>

      </form>
      <div style={{ marginTop: '20px' }}> */{/* Added a margin-top */}/*
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );

}
/*

const Signin = () => {
  return (
    <div className="container">
      <h2>Sign In</h2>
      <form>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <div className="form-group">
          <label>User Type</label>
          <select className="form-control">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>*/
        {/* Move the Link component inside the form */}/*
        <Link to="/dashboard" className="btn btn-primary">Sign In</Link> */{/* Link to dashboard route */}/*

      </form>
      <div style={{ marginTop: '20px' }}> */{/* Added a margin-top */}/*
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

*/
export default LoginPage;
