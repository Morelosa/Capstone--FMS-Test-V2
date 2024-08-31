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


