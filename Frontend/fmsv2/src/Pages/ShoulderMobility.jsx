import React from 'react';
import { Link } from 'react-router-dom';

const ShoulderMobility = () => {
  return (
    <div className="tutorial-container">
      <h1>Shoulder Mobility Tutorial</h1>
      <div className="video-container">
        <iframe
          className="youtube-video"
          width="800"
          height="450"
          src="https://www.youtube.com/embed/4_66p7a6Opk"
          title="Shoulder Mobility Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
       </div>
      <p>
        Shoulder mobility is a crucial aspect of overall fitness and health. It helps improve movement patterns, reduces the risk of injury, and enhances athletic performance. The following tutorial will guide you through a series of exercises to improve shoulder mobility.
      </p>
      <div className="tutorial-text">
        <p><strong>1. Warm-up:</strong> Begin with gentle arm swings or shoulder circles to warm up the shoulder joints and muscles.</p>
        <p><strong>2. Shoulder Stretch:</strong> Extend one arm across your body, keeping it straight, and use the opposite arm to gently pull it closer to your chest.</p>
        <p><strong>3. Shoulder External Rotation:</strong> Stand with your arms bent at 90 degrees and elbows close to your sides. Slowly rotate your forearms outward as far as comfortable.</p>
        <p><strong>4. Shoulder Internal Rotation:</strong> In the same starting position as external rotation, slowly rotate your forearms inward, keeping elbows close to your sides.</p>
        <p><strong>5. Overhead Reach:</strong> Extend your arms overhead and gently lean to one side, then the other, to stretch the sides of your body and shoulders.</p>
        <p><strong>6. Cool-down:</strong> Finish with gentle stretches or static holds to relax your shoulder muscles and improve flexibility.</p>
      </div>
      <div className="buttons-container">
      <Link to="/ExercisesComponents" className="btn btn-go-back">Go Back</Link>
        <Link to="/StartTest"><button className="btn btn-primary">Start Test</button></Link>
      </div>
    </div>
  );
}

export default ShoulderMobility;
