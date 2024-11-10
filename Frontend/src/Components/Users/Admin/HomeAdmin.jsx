import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";
import './HomeAdmin.css';

function HomeAdmin () {
  const navigate = useNavigate();

  return (
    <>
      <Top1 />
      <div className="home-admin-container">
        <div className="sidebar">
          <ul>
            <li onClick={() => navigate("/rota1")}>Página 1</li>
            <li onClick={() => navigate("/rota2")}>Página 2</li>
            <li onClick={() => navigate("/rota3")}>Página 3</li>
          </ul>
        </div>
        
        <div className="main-content">
          <div className="centered-box">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Docente</th>
                  <th>Turno</th>
                  <th>N Sala</th>
                  <th>Nome Sala</th>
                  <th>Turma</th>
                  <th>Bloco</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>João Silva</td>
                  <td>Manhã</td>
                  <td>101</td>
                  <td>Matemática</td>
                  <td>1A</td>
                  <td>Bloco A</td>
                </tr>
                <tr>
                  <td>Ana Souza</td>
                  <td>Tarde</td>
                  <td>102</td>
                  <td>Física</td>
                  <td>2B</td>
                  <td>Bloco B</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeAdmin;