import React, { useState, useEffect} from 'react';
import './StartTest.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const StartTest = () => {

  const [countdown, setCountdown] = useState(0); // Countdown state
  const [testResult, setTestResult] = useState(null); // Test result state
  const [selectedPainScale, setSelectedPainScale] = useState(null); // Selected pain scale state
  const [selectedExercise, setSelectedExercise] = useState(""); // Selected exercise state
  const [exercisePort, setExercisePort] = useState("");

  //const image = document.getElementById("webcam_page_page_src");
  // Function to start the test
  const startCountdown = () => {

    setExercisePort("http://127.0.0.1:5000/"+ {selectedExercise})
    /*axios.request({selectedExercise}).then((response) =>
    console.log(response.status, response.data.token)
  )
    
*/

    setCountdown(10); // Start the countdown from 11
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
  const submitTestResult = (result) => {
    setTestResult(result);
  };

  // Function to reset test
  const resetTest = () => {
    setCountdown(0);
    setTestResult(null);
    setSelectedPainScale(null); // Reset the selected pain scale as well
    setSelectedExercise(null); // Reset the selected exercise as well
    setExercisePort(null); //Resets the exercise port so nothing is displayed
  };

  // Function to handle pain scale selection
  const handlePainScaleSelect = (value) => {
    setSelectedPainScale(value);
  };

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
        <select className="exercise-select" onChange={(e) => handleExerciseSelect(e.target.value)}>
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

      {/* Display selected exercise */}
      {selectedExercise && (
        <p className="selected-exercise">Selected Exercise: {selectedExercise}</p>
      )}

      {/*Display exercise port */}
      {exercisePort &&(
        <p className="selected-exercise">Selected Exercise Port: {exercisePort}</p>
      )}
      

      {/* Display selected pain scale */}
      {selectedPainScale && (
        <p className="selected-pain-scale">Selected Pain Scale: {selectedPainScale}</p>
      )}

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

      {/* Test result */}
      {testResult && (
        <div className="test-result-display">
          <p>Test Result: {testResult}</p>
        </div>
      )}

      {/*Exercise Port 
      {
        exercisePort && (
          <div>
            <p> Test Result: {exercisePort}</p>
          </div>
        )
      }
      */}

      {/* Test result button */}
      <div className="test-result-buttons">
        <button onClick={() => submitTestResult()}>Test Result</button>
      </div>



      {/* Pain scale dropdown */}
      <div className="pain-scale-dropdown">
        <button className="pain-scale-button">Pain Scale</button>
        <select className="pain-scale-select" onChange={(e) => handlePainScaleSelect(parseInt(e.target.value))}>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>

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