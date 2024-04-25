import React, {useState, useEffect} from 'react';
import { AuthMenuItems } from '../Components/MenuItems/AuthMenuItems';
import './Dashboard.css';
import OverviewImage from "../Components/Assets/Overview.jpg";
import logo from "../Components/Assets/logo.png";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {
  const [username, setUserName] = useState(null);
  const navigate = useNavigate();

  const getUser = async () => {
    
    try {
      const response = await axios.post("http://127.0.0.1:5000/@me", {
        email: localStorage.getItem("email")
        
      });
      
      // Check if response status is 200 (OK)
      if (response.status === 200) {
        // Redirect user to dashboard upon successful login
        console.log(response.data);
        setUserName(response.data.name);
        
        

      } else {
        // Handle other response statuses
        console.log("Unexpected response status:", response.status);
      }
    } catch (error) {
      console.error("Error occurred:", error);
    } 
  };

  const signOut = async  () => {
    try {
      await axios.post("http://127.0.0.1:5000/logout");
      localStorage.clear();
      navigate('/');
      window.location.reload();
    } catch (error) {
      console.error("Error occurred during logout:", error);
    }
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div className="dashboard-container">
      <div className="logo-title-container">
        <img src={logo} alt="logo" className="logo-image" />
        <h1 className="dashboard-title">FMS</h1>
      </div>
      {username && (
        <div className="username-menu-item">
          <div className="username-text">{username}</div>
        </div>
      )}


      <ul className="dashboard-menu">
      {AuthMenuItems.map((item, index) => (
          <li key={index} className="dashboard-menu-item">
            {/* Check if the item is Logout, then call handleLogout function */}
            {item.title === 'Logout' ? (
              <a href="/" className="dashboard-menu-link" onClick={signOut}>
                <i className={item.icon}></i>
                {item.title}
              </a>
            ) : (
              <a href={item.url} className="dashboard-menu-link">
                <i className={item.icon}></i>
                {item.title}
              </a>
            )}
          </li>
        ))}
      </ul>

      
      {/*
      <ul className="dashboard-menu">
        {AuthMenuItems.map((item, index) => (
          <li key={index} className="dashboard-menu-item">
            <a href={item.url} className="dashboard-menu-link">
              <i className={item.icon}></i>
              {item.title}
            </a>
          </li>
        ))}
      </ul>
      
      */}


      <div className="overview-image-container">
        <img src={OverviewImage} alt="Overview" className="overview-image" />
      </div>
      <div className="box-container">
        <div className="square-box left-box">
          <p>
            <strong>What is Functional Movement Screening? (FMS)</strong><br />
            The Functional Movement Screen is a system used to screen movement patterns and quality in clients and athletes that could potentially cause injury.
          </p>
        </div>
        <div className="square-box right-box">
          <p>
            <strong>How does FMS work?</strong><br />
            The FMS tests seven different movement patterns and scores them from 1 - 3.
            <br />
           
            1 - the individual cannot perform the movement patterns, even with compensations.
            <br />
            2 - the individual can perform the movement patterns, but must use poor mechanics and compensatory patterns.
            <br />
            3 - the individual can complete movement patterns without compensation, according to criteria.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
