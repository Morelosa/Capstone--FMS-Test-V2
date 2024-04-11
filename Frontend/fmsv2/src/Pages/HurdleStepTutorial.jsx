import React from 'react';
import { Link } from 'react-router-dom';

const HurdleStepTutorial = () => {
  return (
    <div className="tutorial-container">
      <h1>Hurdle Step Tutorial</h1>
      <div className="video-container">
        <iframe
          className="youtube-video"
          width="800"
          height="450"
          src="https://www.youtube.com/embed/7EtMvPFewq8"
          title="Hurdle Step Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
    </div>
      <p>
        The Hurdle Step is a movement pattern that involves stepping over an imaginary or actual hurdle while maintaining balance and stability.
        It is commonly used to assess mobility, stability, and coordination.
      </p>
      <div className="tutorial-text">
        <p><strong>1. Starting Position:</strong> Stand with feet hip-width apart and an imaginary or actual hurdle in front of you.</p>
        <p><strong>2. Alignment:</strong> Maintain an upright posture, engage your core, and keep your gaze forward.</p>
        <p><strong>3. Execution:</strong> Lift one leg and step over the hurdle, keeping the other foot grounded. Follow through with the other leg.</p>
        <p><strong>4. Breathing:</strong> Maintain normal breathing while performing the movement.</p>
        <p><strong>5. Common Mistakes:</strong> Avoid excessive leaning, wobbly movements, or losing balance.</p>
      </div>
      <div className="buttons-container">
      <Link to="/ExercisesComponents" className="btn btn-go-back">Go Back</Link>
        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
}

export default HurdleStepTutorial;
