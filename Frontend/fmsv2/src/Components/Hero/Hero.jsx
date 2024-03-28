// this is to get the background for home page

import "./HeroStyle.css";
// import SBP from "../Assets/SBP.png"


function Hero(props) {
    return (<>
    <div className={props.cName}>
        <img alt="HeroImg" src={props.heroImg}/>
        <div className="hero-text">
            <h1>{props.title}</h1>
            <p>{props.text}</p>
        </div>
    </div>
    </>);
}
export default Hero;




// import React from 'react'...OLDER VERSION
// import './Hero.css'
// import big_logo from '../Assets/big_logo.png'

// const Hero = () => {
//     return(
//         <div className="hero">
//             {/* use this as a logo for main page */}
//             <div className= 'content-left'>
//                 {/* <img src={big_logo.png} alt="" /> */}
//                 <img src={big_logo} alt=""/>
            
//                 </div>
//                 {/* <p>Functional Movement Screening Test </p> */}
//             {/* use this as text on left hand side maybe? */}
//             <div className="content-right">
//                 <h1>FMS Test</h1>
//                 <p>Funtional Movement Screening Test</p>
//             </div>

//         </div>
//     )
// }
// export default Hero

