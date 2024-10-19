import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import LoginDocente from './Components/Users/Docente/LoginDocente';
import LoginAdmin from './Components/Users/Admin/LoginAdmin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Users/Docente/LoginDocente" element={<LoginDocente />} />
        <Route path="/Users/Admin/LoginAdmin" element={<LoginAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
