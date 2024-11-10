import './Login.css';
import Top1 from './Top/Top1';
import users from '../../public/users.png';
import { useNavigate } from 'react-router-dom';
import { MdAdminPanelSettings } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();

  const handleDocente = () => {
    navigate('./Components/Users/Docente/LoginDocente');
  };
  const handleAdmin = () => {
    navigate('./Components/Users/Admin/LoginAdmin');
  };

  return (
    <>
      <Top1 />
      <body>
        <div className='icon-buttons'>
          <img className='photo' src={users} alt="Logo" />
          <div className='buttons-users'>
            <button onClick={handleAdmin}>Admin <MdAdminPanelSettings /></button>
            <button onClick={handleDocente}>Docente <FaChalkboardTeacher /></button>

          </div>


        </div>
      </body>
    </>
  )
}

export default Login
