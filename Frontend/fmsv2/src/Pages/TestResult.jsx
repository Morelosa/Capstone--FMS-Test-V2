//how the test result page will look like 
//import Dashboard from "./Dashboard";
import "../Pages/TestResult.css";
// import Axios from "axios";
// import { useEffect, useState } from "react";

// function TestResult() {

// const fetchTestResult = () => {
// Axios.get("http://127.0.0.1:5000/get_score")
// };


// return(

// <div className="result">
//     <div className="my-test">  
//         <h2>My Test Results</h2>
//     </div> {/*mytest*/}
// <button onClick={fetchTestResult}>Retrieve Score</button>
// </div>


// )
// }
// export default TestResult;


const TestResult = () =>{
return(
    <>
     <div className="bkg">  
        <div className="results">
            <div className="my-test">
            <h2>My Test Results</h2>
            <div className="selected-Exercises">
                <h3>Selected Exercises</h3>
            </div>
            </div>
        </div>
   
     </div>  
</>)} 
export default TestResult;