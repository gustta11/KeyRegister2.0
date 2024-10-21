import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import LoginDocente from './Components/Users/Docente/LoginDocente';
import LoginAdmin from './Components/Users/Admin/LoginAdmin';
import HomeDocente from './Components/Users/Docente/HomeDocente';
import RetirarChave from './Components/Users/Docente/RetirarChave';
import DevolverChave from './Components/Users/Docente/DevolverChave';
import Observacoes from './Components/Users/Docente/Observacoes';
import HomeAdmin from './Components/Users/Admin/HomeAdmin';
import CadastroProfessor from './Components/Users/Admin/CadastroProfessor';
CadastroProfessor

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Users/Docente/LoginDocente" element={<LoginDocente />} />
        <Route path="/Users/Admin/LoginAdmin" element={<LoginAdmin />} />
        <Route path="/Componentes/Users/Docente/HomeDocente" element={<HomeDocente/>} />
        <Route path="/Components/Users/Docente/RetirarChave" element={<RetirarChave />} />
        <Route path="/Components/Users/Docente/DevolverChave" element={<DevolverChave/>} />
        <Route path="/Components/Users/Docente/Observacoes" element={<Observacoes/>} />
        <Route path='/Components/Users/Admin/HomeAdmin' element={<HomeAdmin/>}/>
     <Route path='/Components/Users/Admin/CadastroProfessor' element={<CadastroProfessor/>}/>
      </Routes>
    </Router>
  );
}

export default App;
