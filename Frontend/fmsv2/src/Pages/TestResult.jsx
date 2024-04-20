//how the test result page will look like 
//import Dashboard from "./Dashboard";
import "../Pages/TestResult.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TestResult() {
    //this is to display results 
    
    const [testResults, setTestResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    const fetchTestResult = () => {
        setLoading(true);
    {/*return a promise once this api give back a succesful response and then give access to that response*/}
    
        axios.get("http://127.0.0.1:5000/get_score") 
        .then(response => {
            setTestResults(response.data);
			//console.log(response.data);
            setLoading(false);
			//console.log(loading);
			//console.log(response)
            })
            .catch(error => {
                console.error('No test taken', error);
                setError(error);
                setLoading(false);
                 //this will give you access to the error.dont think this is needed though
            }); 
        };

    useEffect(() => {
        //fetchs results when component mounts
        fetchTestResult();
    }, []);

    // const getprevioustestResults = () => {
    //     //define criteria from older
    //     const cutoffDate = new Date();

    //     cutoffDate.setMonth(cutoffDate.getMonth()-1);

    //     return testResults.filter(result => {
    //         //assuming time stamp is a date string
    //         const testDate = new Date(result.timestamp);
            
    //         return testDate < cutoffDate;
    //     });
    // };

    


return(
<div className="bkg">
<div className="result">
    
    <Link to="/dashboard">
        <button className="go-back-btn">Go Back</button>
    </Link>
    
    <div className="my-test">  
        <h2>My Test Results</h2>
    </div> {/*mytest*/}
    {loading && <p className="loadingMSG">Loading...</p>}
    {error && <p className="errorMSG">Error: {error.message}</p>}
		
	
        <div className="testResults">
            <h3>Results: {testResults}</h3>
        </div>
        {/* <div className="prevTestResults">
            <h3>Previous Results: </h3>
            <ul>
                {previoustestResults.map((result,index) => (
                    <li key={index}>
                        Exercise: {result.exerciseName}, Score: {result.score}
                    </li>
                ))}
            </ul>
        </div> */}

{/* <button onClick={fetchTestResult}>Retrieve Score</button> */}
</div>
</div>//result


)
}
export default TestResult;


// const TestResult = () =>{
// return(
//     <>
//      <div className="bkg">  
//         <div className="results">
//             <div className="my-test">
//             <h2>My Test Results</h2>
//             <div className="selected-Exercises">
//                 <h3>Selected Exercises</h3>
//             </div>
//             </div>
//         </div>
   
//      </div>  
// </>)} 
// export default TestResult;