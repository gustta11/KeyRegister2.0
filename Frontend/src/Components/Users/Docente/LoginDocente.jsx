import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";
import Docente from '../../../../public/logind.png';
import './LoginDocente.css';
import { LiaKeySolid } from "react-icons/lia";
import { useState } from "react";

const LoginDocente = () => {
  const [matricula, setMatricula] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/reservas/matricula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula_docentes: matricula }),
        
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem('matricula_docente', matricula);
        navigate('/Componentes/Users/Docente/HomeDocente');
        
      } else {

        alert(data.message || 'Matrícula não encontrada');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      alert('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    }
  };

  return (
    <>
      <Top1 />
      <div className="login-container">
        <h2>Login Docente</h2>
        <div className='icon-buttons'>
          <img className='photo' src={Docente} alt="Logo" />
          <form className='inputs-docente' onSubmit={handleSubmit}>
            <h3>Matrícula <LiaKeySolid /></h3>
            <input 
              type="text" 
              value={matricula} 
              onChange={(e) => setMatricula(e.target.value)} 
              required
            />
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginDocente;