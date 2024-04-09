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
        <div className="form-group">
          <label>User Type</label>
          <select className="form-control">
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        {/* Link the button to the Sign In page */}
        <Link to="/signin" className="btn btn-primary">Sign Up</Link>
      </form>
      <div style={{ marginTop: '20px' }}> {/* Added a margin-top */}
      <p>Already have an account? <Link to="/signin">Sign In</Link></p>
    </div>
    </div>
  );
};

export default Signup;
