import { useNavigate } from "react-router-dom";
import Top2 from "../../Top/Top2";
import Lease from '../../../../public/Lease.png';
import './HomeDocente.css';

function HomeDocente() {
  const navigate = useNavigate();

  const handleRetirarChave = () => {
    navigate('/Components/Users/Docente/RetirarChave');
  };
  const handleDevolverChave = () => {
    navigate('/Components/Users/Docente/DevolverChave');
  };

  return (
    <>
      <Top2 />
      <div className="titulo-docente"><h2>Seja bem vindo</h2></div>
      <div className="chave-observação">
        <div className="chave">
          <img className="photo" src={Lease} />
          <button onClick={handleRetirarChave}>Retirar chave</button>
          <button onClick={handleDevolverChave}>Devolver Chave</button>
        </div>


      </div >
    </>
  );
}

export default HomeDocente;
