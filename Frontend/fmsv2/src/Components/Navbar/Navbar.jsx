import { Component } from "react";
import "./Navbar.css"
import { MenuItems } from "../MenuItems/MenuItems";
import { Link } from "react-router-dom";



class Navbar extends Component{
   state = {clicked: false};
   handleClick = () =>{
      this.setState({clicked: !this.state.clicked})
   }//  using bc extending our component 
   render(){
      return(
         <nav className="NavbarItems">
            <h1 className="navbar-logo">FMS</h1>
            
            <div className="menu-icons" onClick=
             {this.handleClick}>
               <i 
                  className={this.state.clicked ? "fa-regular fa-circle-xmark" 
                     : "fa-solid fa-bars"}
                     ></i>
            </div>

            <ul className={this.state.clicked ? "nav-menu active" : "nav-menu"}>
               {MenuItems.map((item, index)=>{
              return (
               <li key={index}>
                  <Link className={item.cName} to={item.url}>
                     <i className={item.icon}></i>{item.title}
                  </Link>
               </li>
               )
               })}
               
            </ul>
         </nav>
      );
   }

} 
export default Navbar














//import React, { useState } from 'react';.....OLDER VERSION
// import './Navbar.css'
// // import background from '../Assets/background.png'
//  import user_icon1 from '../Assets/user_icon1.png'
// import { Link } from 'react-router-dom';

// const Navbar = () => {
//     const [menu,setMenu] =useState("overview");
//    return(
   
//     <div  className= 'navbar'>
//        {/* <div className="nav-logo">
//             <img src= {logo1} alt="" />
//                 <p>FMS Test</p>
//         </div> }*/}
//         <ul className="nav-menu">
//             <li onClick={()=>{setMenu("home")}}><Link style={{textDecoration: 'none'}} to='/'>Home</Link>{menu==="home"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("overview")}}><Link style={{textDecoration: 'none'}} to='/overview'>Overview</Link>{menu==="overview"?<hr/>:<></>}</li>
//             <li onClick={()=>{setMenu("exercises/tutorials")}}><Link style={{textDecoration: 'none'}} to='/exercises/tutorials'>Exercises/Tutorials</Link>{menu==="exercises/tutorials"?<hr/>:<></>}</li>
//             {/* <li onClick={()=>{setMenu("tutorials")}}><Link style={{textDecoration: 'none'}} to='tutorials'>Tutorials</Link>{menu==="tutorials"?<hr/>:<></>}</li>
//          */}
//             <div className="nav-login-user">
//         <Link to='/Signin'><button>Sign In</button></Link>
//         <img src= {user_icon1} alt="" />
//      </div>

//         </ul>
    
//     </div>
//    )

// }

// export default Navbar
