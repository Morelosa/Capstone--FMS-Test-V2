import React from 'react';
import { Link } from 'react-router-dom';

const ActiveStraightLegRaise = () => {
  return (
    <div className="tutorial-container">
      <h1>Active Straight Leg Raise Tutorial</h1>
      <div className="video-container">
        <iframe
          className="youtube-video"
          width="800"
          height="450"
          src="https://www.youtube.com/embed/4SRBJN-Ql24"
          title="Active Straight Leg Raise Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        The active straight leg raise is a movement pattern that involves lifting one leg while keeping it straight. This exercise helps assess and improve hamstring flexibility, hip mobility, and core strength.
      </p>
      <div className="tutorial-text">
        <p><strong>1. Starting Position:</strong> Lie on your back with legs straight and arms at your sides.</p>
        <p><strong>2. Raise Your Leg:</strong> Keep one leg straight and lift it up towards the ceiling as high as you can while keeping the other leg flat on the ground.</p>
        <p><strong>3. Hold the Position:</strong> Hold the raised leg in the up position for a few seconds, then lower it back down slowly.</p>
        <p><strong>4. Repeat:</strong> Alternate between legs and repeat the exercise several times for each leg.</p>
        <p><strong>5. Common Mistakes:</strong> Avoid lifting the opposite leg off the ground or bending the knee of the raised leg.</p>
      </div>
      <div className="buttons-container">
        <Link to="/ExercisesComponents" className="btn btn-go-back">Go Back</Link>
        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
};

export default ActiveStraightLegRaise;
