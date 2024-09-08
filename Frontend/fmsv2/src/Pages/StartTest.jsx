import React, { useState, useEffect, useRef} from 'react';
import './StartTest.css';
import { Link } from 'react-router-dom';

const StartTest = () => {

  const [countdown, setCountdown] = useState(0); // Countdown state
  const [selectedExercise, setSelectedExercise] = useState(''); // Selected exercise state
  const [exercisePort, setExercisePort] = useState(null);
  const selectRef= useRef(null);


  //const image = document.getElementById("webcam_page_page_src");
  // Function to start the test
  const startCountdown = () => {
    if(selectedExercise === ""){
      alert("Please first select an exercise");

    }
    else {
      setExercisePort("http://127.0.0.1:5000/"+ selectedExercise);
      setCountdown(10); // Start the countdown from 11
    }
  };

  // Function to handle countdown
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);

      return () => clearTimeout(timer); // Cleanup function
    }
	
  }, [countdown]);

  
  // Function to reset test
  const resetTest = () => {
    setCountdown(0);
    setSelectedExercise(""); 
    selectRef.current.value = "";
    setExercisePort(null); 
    window.location.reload();
  };

  // Function to handle pain scale selection
 

  // Function to handle exercise selection
  const handleExerciseSelect = (value) => {
    setSelectedExercise(value);
  };


  return (
    <div className="start-test-container">

      <div className="webcam-container">
        
      {exercisePort && (
        <img id="webcam_page_page_src" src={exercisePort} width="100%" height="100%" alt=""></img>
      )}

      </div>

      {/* Webcam covering the whole page 
      <div className="webcam-container">
        <img id="webcam_page_page_src" src={exercisePort} width="100%" height="100%" alt=""></img>
      </div>*/}

      


      {/*Let me cook here. Let me cook*/}
      <div className="control-bar">
        {/* Dashboard button on the far left */}
        <Link to="/Dashboard">
          <button className="control-button left-button">
            Dashboard
          </button>
        </Link>
        
        {/* Centered Start Test button and grouped Reset and Tutorial buttons */}
        <div className="center-controls">
          <button className="control-button" onClick={resetTest}>
            Reset Test
          </button>
          <button className="control-button start-button" onClick={startCountdown}>
            <i className="fas fa-desktop"></i>
            Start Test
          </button>
          <Link to="/ExercisesComponents">
            <button className="control-button">
              Tutorial
            </button>
          </Link>
        </div>
        
        {/* Dropdown on the far right */}
        <div className="dropdown-control right-dropdown">
          <select className="exercise-select" ref={selectRef} onChange={(e) => handleExerciseSelect(e.target.value)}>
            <option value="">Select Exercise</option>
            <option value="deep_squat">Deep Squat</option>
            <option value="hurdle_step">Hurdle Step</option>
            <option value="inline_lunge">Inline Lunge</option>
            <option value="shoulder_mobility">Shoulder Mobility</option>
            <option value="active_straight_leg">Active Straight Leg Raise</option>
            <option value="trunk_stability">Trunk Stability Push Up</option>
            <option value="rotary_stability">Rotary Stability</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StartTest;