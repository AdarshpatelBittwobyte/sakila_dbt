// import logo from './logo.svg';
// import './App.css';
// import HomePage from './Home.js'



// function App() {
//   return (
//     <div className="App">
//       <HomePage/>
      
    
     

      
//     </div>
//   );
// }

// export default App;



// import logo from './logo.svg';
// import './App.css';
// import HomeStudent from './HomeStudent.js'



// function App() {
//   return (
//     <div className="App">
//       <HomeStudent/>
      
    
     

      
//     </div>
//   );
// }

// export default App;




// import logo from './logo.svg';
//  import './App.css';
//  import HomeTeacher from './HomeTeacher.js'



// function App() {
//   return (
//    <div className="App">
//      <HomeTeacher/>
      
    
     

      
//    </div>
//   );
// }

//  export default App;


import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import Routes component

import Navbar from './home360';
import Login from './Login';
import Landing360 from './Landing360';
import Contact from './contact360';
import HomePage from './Homepage360';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
        <Route path="/Homepage360" element={<HomePage />} />

          <Route path="/Login" element={<Login />} />
          <Route path="/Landing360" element={<Landing360 />} />
          <Route path="/contact360" element={<Contact />} />
          <Route path="/" element={<Navbar />} /> 


          {/* Other routes */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;


// import logo from './logo.svg';
// import './App.css';
// import Profile from './profile.js';  // Correctly import the Profile component

// function App() {
//   return (
//     <div className="App">
//       <Profile /> {/* Use the Profile component */}
//     </div>
//   );
// }

// export default App;




