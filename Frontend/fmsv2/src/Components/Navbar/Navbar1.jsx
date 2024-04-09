
import { Component } from "react";
import "./Navbar.css"
import {AuthMenuItems } from "../MenuItems/AuthMenuItems";
import { Link } from "react-router-dom";



class Navbar1 extends Component{
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
               {AuthMenuItems.map((item, index)=>{
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
export default Navbar1
