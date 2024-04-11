import React, { useState, useEffect} from 'react';
import './StartTest.css';
import { Link } from 'react-router-dom';

const StartTest = () => {
  const [countdown, setCountdown] = useState(0); // Countdown state
  const [testResult, setTestResult] = useState(null); // Test result state
  const [selectedPainScale, setSelectedPainScale] = useState(null); // Selected pain scale state
  const [selectedExercise, setSelectedExercise] = useState(null); // Selected exercise state

  // Function to start the countdown
  const startCountdown = () => {
    setCountdown(6); // Start the countdown from 6
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
  };

  // Function to handle pain scale selection
  const handlePainScaleSelect = (value) => {
    setSelectedPainScale(value);
  };

  // Function to handle exercise selection
  const handleExerciseSelect = (value) => {
    setSelectedExercise(value);
  };

  return (
    <div className="start-test-container">
      {/* Reset and Go Back buttons */}
      <div className="top-row-buttons">
        <button onClick={resetTest}>Reset</button>
      </div>

      {/* Select Exercise dropdown */}
      <div className="select-exercise-dropdown">
        <select className="exercise-select" onChange={(e) => handleExerciseSelect(e.target.value)}>
          <option value="">Select Exercise</option>
          <option value="Deep Squat">Deep Squat</option>
          <option value="Hurdle Step">Hurdle Step</option>
          <option value="Inline Lunge">Inline Lunge</option>
          <option value="Shoulder Mobility">Shoulder Mobility</option>
          <option value="Active Straight Leg Raise">Active Straight Leg Raise</option>
          <option value="Trunk Stability Push Up">Trunk Stability Push Up</option>
          <option value="Rotary Stability">Rotary Stability</option>
        </select>
      </div>

      {/* Display selected exercise */}
      {selectedExercise && (
        <p className="selected-exercise">Selected Exercise: {selectedExercise}</p>
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

      {/* Webcam covering the whole page */}
      <div className="webcam-container">
		<img src="http://127.0.0.1:5000/" width="100%" height="100%" alt="What Python sees stream"></img>
      </div>

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