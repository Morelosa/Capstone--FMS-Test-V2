/**This page is where all the page routing wil go.
 * For organization sake, each of the pages we make should go into the pages section to make it easy to naviage.
 * To connect the pages together, you'll need to make a router on this page for all other pages.
 * No pages should be made on here, they should be made on seperate files for modularity.
 * The other comments should show you how the frontend should connect to the backend. If you need more help,
 * let me know.
 * Asides from that, you have free reign on how to code the project. If you need help with anything, let me know.
 * -Antonio Morelos
 * 
 */

import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from "./Pages/Home"; 
import Overview from "./Pages/Overview";
// import ExercisesnTutorials from './Pages/ExercisesnTutorials';
// import Exercises from './Pages/Exercises';
import Exercises from './Pages/Exercises';
import Signin from './Pages/Signin';

export default function App() {
  return(
    <div className='="App'>
      <Routes>
        <Route path= "/" element={<Home/>}/>
        <Route path= "/overview" element={<Overview/>}/>
        <Route path= "/exercies+tuorials" element={<Exercises/>}/>
        <Route path='/signin' element={<Signin/>}/>
      </Routes>

      
    </div>
  )
}




// import './App.css';....OLDER VERSION
// import Navbar from './Components/Navbar/Navbar';
// import { BrowserRouter,Routes,Route } from "react-router-dom";
// import HomeCategory from "./Pages/HomeCategory";
// import Home from "./Pages/Home";
// import Product from "./Pages/Product";
// import Signin from "./Pages/Signin";
// import Signup from "./Pages/Signup";



// function App() {

//   return (
   
//     <div>
//       <BrowserRouter>
//       <Navbar/>
//       <Routes>
//         <Route path='/' element={<Home/>}/>
//         <Route path='/overview' element={<HomeCategory category="overview"/>}/>
//         <Route path='/exercises' element={<HomeCategory category="exercises"/>}/>
//         <Route path='/tutorials' element={<HomeCategory category="tutorials"/>}/>
//         <Route path="product" element={<Product/>}>
//           <Route path=":productId" element={<Product/>}/>
//         </Route>
//         <Route path='/Signin' element={<Signin/>}/>
//         <Route path='/Signup' element={<Signup/>}/>
//       </Routes>
//       </BrowserRouter>
     
//     </div>
//   );
// }
// export default App;

