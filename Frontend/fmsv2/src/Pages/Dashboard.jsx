import React from 'react';
import { Link } from 'react-router-dom';
import { AuthMenuItems } from '../Components/MenuItems/AuthMenuItems';
import './Dashboard.css';
import OverviewImage from "../Components/Assets/Overview.jpg"; // Import the Overview image
import logo from "../Components/Assets/logo.png";

const Dashboard = () => {
  return (
    <div className="dashboard-container">
      <div className="logo-title-container">
        <img src={logo} alt="logo" className="logo-image" /> 
        <h1 className="dashboard-title">FMS</h1>
      </div>
      <ul className="dashboard-menu">
        {AuthMenuItems.map((item, index) => (
          <li key={index} className="dashboard-menu-item">
            <Link to={item.url} className="dashboard-menu-link">
              <i className={item.icon}></i> {/* Icon */}
              {item.title}
            </Link>
          </li>
        ))}
      </ul>
      <div className="overview-image-container">
        <img src={OverviewImage} alt="Overview" className="overview-image" /> {/* Use the Overview image */}
      </div>
      <div className="box-container">
        <div className="square-box left-box">
          <p>
            <strong>What is Functional Movement Screening? (FMS)</strong><br />
            The Functional Movement Screen is a system used to screen movement patterns and quality in clients and athletes that could potentially cause injury. It is not a system designed to diagnose or treat injury, but rather highlight limitations and asymmetries through basic movement patterns.
          </p>
        </div>
        <div className="square-box right-box">
          <p>
            <strong>How does FMS work?</strong><br />
            The FMS tests seven different movement patterns and scores them from 0 - 3.
            <br />
            0 - there is pain during any movement.
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
