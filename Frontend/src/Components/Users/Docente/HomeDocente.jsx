import { useNavigate } from "react-router-dom";
import Top2 from "../../Top/Top2";
import Lease from '../../../../public/Lease.png';
import Inscription from '../../../../public/inscription.png';
import './HomeDocente.css';

function HomeDocente() {
  return (
    <>
      <Top2 />
      <div className="titulo-docente"><h2>Seja bem vindo</h2></div>
      <div className="chave-observação">
        <div className="chave">
          <img className="photo" src={Lease} />
          <button>Retirar chave</button>
          <button>Devolver Chave</button>
        </div>

        <div className="linha">0</div>

        <div className="observaçao">
          <img src={Inscription} />
          <button>Observações</button>
        </div>

      </div >
    </>
  );
}

export default HomeDocente;
