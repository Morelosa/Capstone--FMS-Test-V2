import React, { useState, useEffect, useRef} from 'react';
import './StartTest.css';
import { Link, useNavigate } from 'react-router-dom';

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

  // Function to handle submitting test result
  
  // Function to reset test
  const resetTest = () => {
    setCountdown(0);
    setSelectedExercise(""); // Reset the selected exercise as well
    selectRef.current.value = "";
    setExercisePort(null); //Resets the exercise port so nothing is displayed
    window.location.reload();
  };

  // Function to handle pain scale selection
 

  // Function to handle exercise selection
  const handleExerciseSelect = (value) => {
    setSelectedExercise(value);
  };
  const dialog = document.querySelector("dialog")


  return (
    <div className="start-test-container">
      {/* Reset and Go Back buttons */}
      <div className="top-row-buttons">
        <button onClick={resetTest}>Reset</button>
      </div>

      {/*Port to retrieve image source:http://127.0.0.1:5000/  */}
      {/* Select Exercise dropdown */}
      <div className="select-exercise-dropdown">
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

      

      {/* Go Back button */}
      <div className="go-back-button">
        <Link to="/Dashboard">
          <button>Go Back</button>
        </Link>
      </div>




      {/* Webcam covering the whole page 
      <div className="webcam-container">
        <img id="webcam_page_page_src" src={exercisePort} width="100%" height="100%" alt=""></img>
      </div>*/}
      {exercisePort && (
        <img id="webcam_page_page_src" src={exercisePort} width="100%" height="100%" alt=""></img>
      )}

      {/*This is where the backend is going to be implimented */}
      {/* Start Test button */}
      {countdown === 0 && (
        <button onClick={startCountdown} className="start-test-button">
          Start Test
        </button>
      )}

      {/* Countdown display */}
      {countdown > 0 && (
        <div className="countdown-display">
          <p>Starting in {countdown}</p>
        </div>
      )}


      {/* Pain scale dropdown */}
      {/* 
      <div className="pain-scale-dropdown">
        <button className="pain-scale-button">Pain Scale</button>
        <select className="pain-scale-select" onChange={(e) => handlePainScaleSelect(parseInt(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      */}

      {/* Linking the "Click for tutorial" button */}
      <div className="tutorial-button">
        <Link to="/ExercisesComponents">
          <button>Click Here for tutorial</button>
        </Link>
      </div>
    </div>
  );
};

export default StartTest;