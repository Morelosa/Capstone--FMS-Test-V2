import React, { useState } from 'react';
import './Navbar.css'
import logo from '../Assets/logo.png'
import user_icon1 from '../Assets/user_icon1.png'

const Navbar = () =>{
    const [menu,setMenu] =useState("overview");
   return(
    <div  classname= 'navbar'>
        <div className="nav-logo">
            <img src= {logo} alt="" />
                <p>FMS Test</p>
        </div>
        <ul className="nav-menu">
            <li onClick={()=>{setMenu("overview")}}>Overview{menu==="overview"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("exercise")}}>Exercises{menu==="exercise"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("tutorial")}}>Tutorials{menu==="tutorial"?<hr/>:<></>}</li>
        </ul>
     <div className="nav-login-user">
        <button>Login</button>
        <img src= {user_icon1} alt="" />
     </div>

    </div>
   )

}

export default Navbar