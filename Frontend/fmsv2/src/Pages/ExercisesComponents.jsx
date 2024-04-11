import I1 from "../Components/Assets/DeepSquat.png";
import I2 from "../Components/Assets/HurdleStep.png";
import I3 from "../Components/Assets/InLineLunge.png";
import I4 from "../Components/Assets/ShoulderMobility.png";
import I5 from "../Components/Assets/ActiveStraightLegRaise.png";
import I6 from "../Components/Assets/TrunkStabilityPushUp.png";
import I7 from "../Components/Assets/RotaryStability.png";
import { Link } from 'react-router-dom';
import "./ExercisesStyle.css";

const ExercisesComponents = () => {
    return (
        <div className="exercisescomp">
            <Link to="/dashboard">
                <button className="go-back-button">Go Back</button>
            </Link>
            <div className="first-exrecisescomp">
                <div className="exercise-item">
                    <img src={I1} alt="Deep Squat" />
                    <h2>Deep Squat</h2>
                    <Link to="/deep-squat-tutorial">
                        <button className="btn btn-primary">Click here for tutorial</button>
                    </Link>
                </div>
                <div className="exercise-item">
                    <img src={I2} alt="Hurdle Step" />
                    <h2>Hurdle Step</h2>
                    <Link to="/hurdle-step-tutorial">
                        <button className="btn btn-primary">Click here for tutorial</button>
                    </Link>
                </div>
                <div className="exercise-item">
                    <img src={I3} alt="Inline Lunge" />
                    <h2>Inline Lunge</h2>
                    <Link to="/inline-lunge-tutorial">
                        <button className="btn btn-primary">Click here for tutorial</button>
                    </Link>
                </div>
                <div className="exercise-item">
                    <img src={I4} alt="Shoulder Mobility" />
                    <h2>Shoulder Mobility</h2>
                    <Link to="/shoulder-mobility-tutorial">
                        <button className="btn btn-primary">Click here for tutorial</button>
                    </Link>
                </div>
                <div className="exercise-item">
                    <img src={I5} alt="Active Straight Leg Raise" />
                    <h2>Active Straight Leg Raise</h2>
                    <Link to="/active-straight-leg-raise-tutorial">
                        <button className="btn btn-primary">Click here for tutorial</button>
                        </Link>
                </div>
                <div className="exercise-item">
                    <img src={I6} alt="Trunk Stability Push up" />
                    <h2>Trunk Stability Push up</h2>
                    <Link to="/trunk-stability-push-up-tutorial">
                        <button className="btn btn-primary">Click here for tutorial</button>
                        </Link>
                </div>
                <div className="exercise-item">
                    <img src={I7} alt="Rotary Stability" />
                    <h2>Rotary Stability</h2>
                    <Link to="/rotary-stability-tutorial">
                        <button className="btn btn-primary">Click here for tutorial</button>
                        </Link>
                </div>
            </div>
        </div>
    );
};

export default ExercisesComponents;
