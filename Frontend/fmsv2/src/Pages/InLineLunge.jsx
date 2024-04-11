import React from 'react';
import { Link } from 'react-router-dom';

const InLineLunge = () => {
  return (
    <div className="tutorial-container">
      <h1>Inline Lunge Tutorial</h1>
      <div className="video-container">
        <iframe
          className="youtube-video"
          width="800"
          height="450"
          src="https://www.youtube.com/embed/nUPiekbIm9Q"
          title="Inline Lunge Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
       </div>
      <p>
        The inline lunge is a movement pattern that assesses your stability, mobility, and strength. It involves stepping one foot directly in front of the other while maintaining balance and control.
      </p>
      <div className="tutorial-text">
        <p><strong>1. Starting Position:</strong> Stand with feet hip-width apart, and arms by your sides. Place one foot directly in front of the other, with the heel of the front foot touching the toe of the back foot.</p>
        <p><strong>2. Alignment:</strong> Keep your core engaged and maintain an upright posture. Keep your gaze forward.</p>
        <p><strong>3. Execution:</strong> Bend both knees, lowering your back knee towards the ground while keeping the front knee directly over the ankle. Return to the starting position and repeat on the other side.</p>
        <p><strong>4. Breathing:</strong> Inhale as you lower into the lunge, exhale as you return to the starting position.</p>
        <p><strong>5. Common Mistakes:</strong> Avoid allowing the front knee to extend beyond the toes, or letting your back knee touch the ground too forcefully. Avoid wobbling and aim for smooth, controlled movements.</p>
      </div>
      <div className="buttons-container">
      <Link to="/" className="btn btn-go-back">Go Back</Link>

        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
}

export default InLineLunge;
