import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import LoginDocente from './Components/Users/Docente/LoginDocente';
import LoginAdmin from './Components/Users/Admin/LoginAdmin';
import HomeDocente from './Components/Users/Docente/HomeDocente';
import HomeAdmin from './Components/Users/Admin/HomeAdmin';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Components/Users/Docente/LoginDocente" element={<LoginDocente />} />
        <Route path="/Components/Users/Admin/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/Componentes/Users/Docente/HomeDocente" element={<HomeDocente/>} />
        <Route path='/Components/Users/Admin/HomeAdmin' element={<HomeAdmin/>}/>
      </Routes>
    </Router>
  );
}

export default App;
