import React from 'react';
import { Link } from 'react-router-dom';

const DeepSquatTutorial = () => {
  return (
    <div className="tutorial-container">
      <h1>Deep Squat Tutorial</h1>
      <div className="video-container">
        <iframe
          className="youtube-video"
          width="800" // Adjust width as needed
          height="450" // Adjust height as needed
          src="https://www.youtube.com/embed/fJLR9Vw4zH8"
          title="Deep Squat Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        The deep squat is a fundamental movement pattern that involves lowering your body into a deep squat position.
        It is commonly used in strength training, mobility exercises, and functional fitness routines.
      </p>
      <div class="tutorial-text">
  <p><strong>1. Starting Position:</strong> Stand with feet slightly wider than shoulder-width apart, toes pointed slightly outward.</p>
  <p><strong>2. Alignment:</strong> Keep chest up, core engaged, and spine neutral. Relax shoulders and let arms hang naturally.</p>
  <p><strong>3. Execution:</strong> Bend knees and push hips back, lowering body down while keeping heels flat. Aim for hips to go below knees.</p>
  <p><strong>4. Breathing:</strong> Inhale as you lower, exhale as you rise back up, engaging core and glutes.</p>
  <p><strong>5. Common Mistakes:</strong> Avoid knees collapsing inward, rounding the back, or lifting heels off the ground.</p>
</div>


      <div className="buttons-container">
      <Link to="/ExercisesComponents" className="btn btn-go-back">Go Back</Link>

        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
}

export default DeepSquatTutorial;
