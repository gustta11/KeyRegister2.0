import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";
import Docente from '../../../../public/logind.png';
import { PiLockKeyDuotone } from "react-icons/pi";
import { LiaKeySolid } from "react-icons/lia";
import { useState } from "react";

const LoginAdmin = () => {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (usuario === 'a' && senha === 'a') {
      navigate('/Components/Users/Admin/HomeAdmin');
    } else {
      alert('Login ou senha incorretos');
    }
  };

  return (
    <>
      <Top1 />
      <div className="login-container">
        <h2>Login Admin</h2>
        <div className='icon-buttons'>
          <img className='photo' src={Docente} alt="Logo" />
          <form className='inputs-docente' onSubmit={handleSubmit}>
            <h3>Usuário <PiLockKeyDuotone /></h3>
            <input 
              type="text" 
              value={usuario} 
              onChange={(e) => setUsuario(e.target.value)} 
              required
            />

            <h3>Senha <LiaKeySolid /></h3>
            <input 
              type="password" 
              value={senha} 
              onChange={(e) => setSenha(e.target.value)} 
              required
            />
            
            <button type="submit">Entrar</button>
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginAdmin;
