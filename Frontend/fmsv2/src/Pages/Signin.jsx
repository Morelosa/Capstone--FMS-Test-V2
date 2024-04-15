import React, {useState, useRef, useEffect} from 'react'; 
import './Style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage(){
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = async () => {
    console.log(email, password);

    try {
      const resp = await axios.post("//localhost:5000/login", {
        email,
        password,
      });

      window.location.href = "/Dashboard";
    } catch (error) {
      if (error.response.status === 401) {
        alert("Invalid credentials");
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
        <button type = "button" onClick = {()=> logInUser}>
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
