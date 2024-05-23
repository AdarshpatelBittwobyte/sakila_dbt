import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Logins from './Logins';
import Signups from './Signups';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Logins />} />
        <Route path='/signups' element={<Signups />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
