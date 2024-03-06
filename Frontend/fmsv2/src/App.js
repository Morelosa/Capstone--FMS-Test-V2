import logo from './logo.svg';
import './App.css';
//import Test from './Pages/Test.js';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          This is where the FMS Test v2 Frontend will go! 
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;


//The following commented code was to test the connectivity of flask to react.
//It was left here as refrence. For info about the <Test/> page, look in the Pages folder

/*
function App(){
  return(
    <div className = "App">
      <Test/>
    </div>
  );
}
export default App;
*/
