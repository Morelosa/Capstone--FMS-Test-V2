import "./Home.css";
import Image from "../Components/Assets/New logo.png";

export default function Home() {
  return(
    <div className = "main">
      <div className = "menu">
        <ul>
          <li className = "active"><a href = "/signup" className = "signup-button"><span>Sign Up</span></a></li>
          <li className = "active"><a href = "/signin" className = "signin-button"><span>Sign In</span></a></li>
        </ul>
      </div>
      <div className = "banner">
        <div className = "text">
          <h1>FMS Test</h1>
          <p>Functional Movement Screen Test</p>
        </div>
        <div className = "picture">
          <img src = {Image} />
        </div>
      </div>
    </div>
  )
}



