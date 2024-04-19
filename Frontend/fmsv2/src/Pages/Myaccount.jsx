import React, { useState } from 'react';
import './MyAccount.css';
import { Link } from "react-router-dom";

const MyAccount = () => {
  const [firstName, setFirstName] = useState('John');
  const [lastName, setLastName] = useState('Smith');
  const [email, setEmail] = useState('johnsmith@example.com');
  const [address, setAddress] = useState('123 Main St, City, State, Zipcode, Country');
  const [dob, setDob] = useState('01/01/1990');
  const [isEditing, setIsEditing] = useState(false);

  const handleEditName = () => {
    setIsEditing(true);
  };

  const handleSaveName = () => {
    setIsEditing(false);
    // Perform any necessary operations like sending updated data to the server
  };

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);
  };

  const handleDobChange = (e) => {
    setDob(e.target.value);
  };

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
            <label className="bold-blue">First Name:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={handleFirstNameChange}
              />
            ) : (
              <span onClick={handleEditName}>{firstName}</span>
            )}
          </div>
          <div className="form-group">
            <label className="bold-blue">Last Name:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={handleLastNameChange}
              />
            ) : (
              <span onClick={handleEditName}>{lastName}</span>
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
          <div className="form-group">
            <label className="bold-blue">Date of Birth:</label>
            {isEditing ? (
              <input
                type="date"
                className="form-control"
                value={dob}
                onChange={handleDobChange}
              />
            ) : (
              <span onClick={handleEditName}>{dob}</span>
            )}
          </div>
          <div className="form-group">
            <label className="bold-blue">Address:</label>
            {isEditing ? (
              <input
                type="text"
                className="form-control"
                value={address}
                onChange={handleAddressChange}
              />
            ) : (
              <span onClick={handleEditName}>{address}</span>
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
