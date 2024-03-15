// Signup.jsx
import React from 'react'; 
import './Style.css'
import { Link } from 'react-router-dom';

const Signup = () => {
  return (
    <div className="container">
      <h2>Sign Up</h2>
      <form>
        <div className="form-group">
          <label>Name</label>
          <input type="text" className="form-control" />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" className="form-control" />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" className="form-control" />
        </div>
        <button type="submit" className="btn btn-primary">Sign Up</button>
      </form>
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
  );
};

export default Signup;
