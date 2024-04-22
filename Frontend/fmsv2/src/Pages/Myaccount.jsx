import React, { useState, useEffect } from 'react';
import './MyAccount.css';
import { Link } from "react-router-dom";
import axios from 'axios';

const MyAccount = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const getUser = async () => {
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/@me", {
        email: localStorage.getItem("email")
        
      });
      
      // Check if response status is 200 (OK)
      if (response.status === 200) {
        // Redirect user to dashboard upon successful login
        console.log(response.data);
        setName(response.data.name);
        setEmail(localStorage.getItem("email"));
        
        

      } else {
        // Handle other response statuses
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } 
  };

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveName = () => {
    setIsEditing(false);
    // Perform any necessary operations like sending updated data to the server
  };

  const handleFirstNameChange = (e) => {
    setName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    getUser();
  }, [])

 
  return (
    <div className='account.pg'>
      <Link to="/dashboard">
        <button className="back-button">Go Back</button>
    </Link>
    <div className="my-account-container">
      {/* New container for user information and support sections */}
      <div className="content-wrapper">
        {/* User Information Section */}
        <div className="user-info-box">
          <div className="subtitle">User Information</div>
          <div className="form-group">
            <label className="bold-blue">Name:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={handleFirstNameChange}
              />
            ) : (
              <span onClick={handleEditName}>{name}</span>
            )}
          </div>
   
          <div className="form-group">
            <label className="bold-blue">Email:</label>
            {isEditing ? (
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={handleEmailChange}
              />
            ) : (
              <span onClick={handleEditName}>{email}</span>
            )}
          </div>
          {isEditing && (
            <button className="btn btn-primary" onClick={handleSaveName}>
              Save
            </button>
          )}
        </div>
        
        {/* Separator line */}
        <div className="separator"></div>
        
        {/* Support Section */}
        <div className="subtitle">Support</div>
        <div className="contact-info">
          <p>
            <span className="bold-blue">Contact Us:</span>
          </p>
          <div className="social-media-icons">
            <i className="fab fa-facebook" style={{ color: '#3b5998' }}></i>
            <i className="fab fa-instagram" style={{ color: '#e4405f' }}></i>
            <i className="fab fa-twitter" style={{ color: '#1da1f2' }}></i>
            <i className="fab fa-youtube" style={{ color: '#ff0000' }}></i>
          </div>
          <p>
            <i className="fas fa-phone"></i> Phone Number: 9039177578
          </p>
          <p>
            <i className="far fa-envelope"></i> Email: Helpsupport@fms.com
          </p>
          <p>
            <i className="fas fa-map-marker-alt"></i> Address: 3501 Liberty Ln, Tyler, TX 75701
          </p>
        </div>
      </div>
    </div>
    </div>
  );
};

export default MyAccount;
