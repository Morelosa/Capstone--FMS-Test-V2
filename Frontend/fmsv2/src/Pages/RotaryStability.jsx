import React from 'react';
import { Link } from 'react-router-dom';

const RotaryStability = () => {
  return (
    <div className="tutorial-container">
      <h1>Rotary Stability Tutorial</h1>
      <div className="video-container">
        <iframe
          className="youtube-video"
          width="800"
          height="450"
          src="https://www.youtube.com/embed/3iiRKurUlFc"
          title="Rotary Stability Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
      <p>
        Rotary Stability is an exercise that assesses core stability and neuromuscular control while moving the limbs. This exercise is a key part of functional movement screening and is designed to evaluate your ability to maintain stability and control during dynamic limb movement.
      </p>
      <div className="tutorial-text">
        <p><strong>1. Starting Position:</strong> Begin on your hands and knees, keeping your hands directly under your shoulders and your knees directly under your hips.</p>
        <p><strong>2. Lift Opposite Limbs:</strong> Simultaneously lift one arm and the opposite leg, extending them straight out. Your arm should be parallel to the floor, and your leg should be in line with your body.</p>
        <p><strong>3. Hold the Position:</strong> Hold the lifted position briefly, ensuring your body remains straight and balanced.</p>
        <p><strong>4. Return to Starting Position:</strong> Slowly lower your arm and leg back to the starting position and switch to the other side.</p>
        <p><strong>5. Repeat:</strong> Alternate between sides and repeat the exercise several times for each side.</p>
        <p><strong>6. Common Mistakes:</strong> Avoid arching your back, letting your hips sag, or rotating your body during the exercise. Maintain a straight line from head to toe throughout the movement.</p>
      </div>
      <div className="buttons-container">
        <Link to="/ExercisesComponents" className="btn btn-go-back">Go Back</Link>
        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
};

export default RotaryStability;
