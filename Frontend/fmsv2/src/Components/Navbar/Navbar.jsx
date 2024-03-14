import React, { useState } from 'react';
import './Navbar.css'
// import background from '../Assets/background.png'
import user_icon1 from '../Assets/user_icon1.png'
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [menu,setMenu] =useState("overview");
   return(
   
    <div  classname= 'navbar'>
       {/* <div className="nav-logo">
            <img src= {logo1} alt="" />
                <p>FMS Test</p>
        </div> }*/}
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("overview")}}><Link style={{textDecoration: 'none'}} to='/overview'>Overview</Link>{menu==="overview"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("exercises")}}><Link style={{textDecoration: 'none'}} to='/exercises'>Exercises</Link>{menu==="exercises"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("tutorials")}}><Link style={{textDecoration: 'none'}} to='tutorials'>Tutorials</Link>{menu==="tutorials"?<hr/>:<></>}</li>
        
            <div className="nav-login-user">
        <Link to='/login'><button>Sign In</button></Link>
        <img src= {user_icon1} alt="" />
     </div>

        </ul>
    
    </div>
   )

}

export default Navbar
