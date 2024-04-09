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
          src="https://www.youtube.com/embed/4_66p7a6Opk"
          title="Active Straight Leg Raise Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        The deep squat is a fundamental movement pattern that involves lowering your body into a deep squat position.
        It is commonly used in strength training, mobility exercises, and functional fitness routines.
      </p>

      <p>
        <strong>1. Starting Position:</strong> Stand with feet slightly wider than shoulder-width apart, toes pointed slightly outward. <br />
        <strong>2. Alignment:</strong> Keep chest up, core engaged, and spine neutral. Relax shoulders and let arms hang naturally. <br />
        <strong>3. Execution:</strong> Bend knees and push hips back, lowering body down while keeping heels flat. Aim for hips to go below knees. <br />
        <strong>4. Breathing:</strong> Inhale as you lower, exhale as you rise back up, engaging core and glutes. <br />
        <strong>5. Common Mistakes:</strong> Avoid knees collapsing inward, rounding the back, or lifting heels off the ground.
      </p>
      <div className="buttons-container">
        <Link to="/"><button className="btn">Go Back</button></Link>
        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
}

export default ActiveStraightLegRaise;
