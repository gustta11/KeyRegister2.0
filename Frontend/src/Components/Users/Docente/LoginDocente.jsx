import { useNavigate } from "react-router-dom"
import Top1 from "../../Top/Top1"
import Docente from '/Users/Administrador/Downloads/Key Register 2.0/Frontend/public/docentelogin.png';
import './LoginDocente.css'
function LoginDocente() {

  return (
    <>
      <Top1 />
      <body>
        <div className='icon-buttons'>
          <img className='photo' src={Docente} alt="Logo" />
          <div className='inputs-docente'>
            Usuário<input type="text" />
            Senha<input type="password" />
          </div>
        </div>
      </body>
    </>
  )
}

export default LoginDocente
