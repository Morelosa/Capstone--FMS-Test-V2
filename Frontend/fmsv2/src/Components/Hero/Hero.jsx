// this is to get the background for home page
import React from 'react'
import './Hero.css'
import big_logo from '../Assets/big_logo.png'

const Hero = () => {
    return(
        <div className="hero">
            {/* use this as a logo for main page */}
            <div className= 'content-left'>
                {/* <img src={big_logo.png} alt="" /> */}
                <img src={big_logo} alt=""/>
            
                </div>
                {/* <p>Functional Movement Screening Test </p> */}
            {/* use this as text on left hand side maybe? */}
            <div className="content-right">
                <h1>FMS Test</h1>
                <p>Funtional Movement Screening Test</p>
            </div>

        </div>
    )
}
export default Hero

