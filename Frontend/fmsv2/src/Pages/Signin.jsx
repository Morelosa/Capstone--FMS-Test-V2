import React from 'react'; 
import './Style.css';
import { Link } from 'react-router-dom';

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
        </div>
        {/* Move the Link component inside the form */}
        <Link to="/dashboard" className="btn btn-primary">Sign In</Link> {/* Link to dashboard route */}
      </form>
      <div style={{ marginTop: '20px' }}> {/* Added a margin-top */}
        <p>Don't have an account? <Link to="/signup">Sign Up</Link></p>
      </div>
    </div>
  );
};

export default Signin;
