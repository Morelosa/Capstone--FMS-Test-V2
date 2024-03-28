import I1 from "../Components/Assets/squat.png";
import "./ExercisesStyle.css"

const ExercisesComponents = ()=>{
    return(
        <div className="exercisescomp">
           <div className="first-exrecisescomp"> *
                 <div className="first-ex-txt">
                    <h2>Deep Squat</h2>
                </div> 
                {/* //first-ex-txt */}
                <div className="image">
                    <img alt="img" src={I1}/>
                </div> 
                
                {/* //image */}
            </div>  
            {/* //first-exercisescomp */}

        </div> //exercisescomp
    );
};
export default ExercisesComponents;