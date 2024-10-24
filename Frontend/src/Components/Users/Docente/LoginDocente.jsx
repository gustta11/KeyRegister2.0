import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";
import Docente from '../../../../public/logind.png';
import './LoginDocente.css';
import { LiaKeySolid } from "react-icons/lia";
import { useState } from "react";

const LoginDocente = () => {
  const [matricula, setMatricula] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (matricula === 'docente123') {
      navigate('/Componentes/Users/Docente/HomeDocente');
    } else {
      alert('Login ou senha incorretos');
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
              type="password" 
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
