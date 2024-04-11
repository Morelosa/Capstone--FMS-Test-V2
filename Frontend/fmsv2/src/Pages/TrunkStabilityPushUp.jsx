import React from 'react';
import { Link } from 'react-router-dom';

const TrunkStabilityPushUp = () => {
  return (
    <div className="tutorial-container">
      <h1>Trunk Stability Push-Up Tutorial</h1>
      <div className="video-container">
        <iframe
          className="youtube-video"
          width="800"
          height="450"
          src="https://www.youtube.com/embed/Vvdh2w4Co_k"
          title="Trunk Stability Push-Up Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        The Trunk Stability Push-Up is an exercise that evaluates core stability and strength while performing a push-up movement. This exercise is a key part of functional movement screening and is designed to assess your ability to maintain stability and control during the push-up.
      </p>
      <div className="tutorial-text">
        <p><strong>1. Starting Position:</strong> Start in a push-up position with your body in a straight line from head to heels.</p>
        <p><strong>2. Lower Your Body:</strong> Slowly lower your body down while keeping your core tight and back straight.</p>
        <p><strong>3. Push Up:</strong> Once you reach a comfortable depth, push back up to the starting position while maintaining proper form.</p>
        <p><strong>4. Repeat:</strong> Continue this movement for several repetitions, focusing on maintaining proper form.</p>
        <p><strong>5. Common Mistakes:</strong> Avoid arching your back or allowing your hips to sag. Keep your body straight and core engaged.</p>
      </div>
      <div className="buttons-container">
        <Link to="/ExercisesComponents" className="btn btn-go-back">Go Back</Link>
        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
};

export default TrunkStabilityPushUp;
