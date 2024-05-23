// App.js
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signups from './Signups';
import Home from './Home'; // Import the Home component

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signups' element={<Signups />} />
        <Route path='/home' element={<Home />} /> {/* Add route for the home page */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
