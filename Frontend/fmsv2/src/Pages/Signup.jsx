import React, { useState } from 'react';
import './Style.css';
import { Link } from 'react-router-dom';
import axios from 'axios';


function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerUser = async () => {
    try{
      const resp = await axios.post("//localhost:5000/register",{
        name,
        email,
        password,
      });

      window.location.href = "/login"
    } catch(error){
      if(error.response.status == 401){
        alert("Invalid credentials")
      }
    }
  }

  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} className="form-control" onChange={(e)=> setName(e.target.value)}  />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} id="" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" value={password} onChange={(e)=> setPassword(e.target.value)} />
        </div>
        <div className="form-group">
          <label>User Type</label>
          <select className="form-control">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {/* Link the button to the Sign In page */}
        <Link to="/signin" className="btn btn-primary">Sign Up</Link>
        <button type="button" onClick={registerUser}>The real sign up button</button>

      </form>
      <div style={{ marginTop: '20px' }}> {/* Added a margin-top */}
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
    </div>
  );
};

export default Signup;
