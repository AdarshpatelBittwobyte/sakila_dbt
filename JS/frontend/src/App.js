import React from 'react';
import Logins from './Logins'
import Signups from './Signups'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Logins />} ></Route>
        <Route path='/Signups' element={<Signups />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
