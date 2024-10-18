import './Login.css'
import Top1 from './Top/Top1';
import users from '/Users/Administrador/Downloads/Key Register 2.0/Frontend/public/users.png';

function Login() {

  return (
    <>
      <Top1 />
      <body>
        <div className='icon-buttons'>
          <img className='photo' src={users} alt="Logo" />;
          <div className='buttons-users'>
            <button>Admin</button>
            <button>Docente</button>

          </div>


        </div>
      </body>
    </>
  )
}

export default Login
