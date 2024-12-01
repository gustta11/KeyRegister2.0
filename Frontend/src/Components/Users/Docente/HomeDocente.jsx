import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FaArrowLeft } from "react-icons/fa";
import { faLockOpen } from '@fortawesome/free-solid-svg-icons';
import './HomeDocente.css';
import Rodape from "../../Rodapé/Rodape";

function HomeDocente() {
  const [reservas, setReservas] = useState([]);
  const [retiradaChave, setRetiradaChave] = useState({});
  const [aviso, setAviso] = useState({ ativo: false, mensagem: '' });
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };

  const fetchReservas = async () => {
    const matricula = localStorage.getItem('matricula_docente');
    if (!matricula) {
      console.error('Matrícula não encontrada. Redirecionando para o login.');
      navigate('/login');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reservas/matricula`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricula_docentes: matricula })
      });

      if (!response.ok) {
        console.error('Erro ao buscar reservas:', response.statusText);
        return;
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        setReservas(data);
      } else {
        console.warn('Nenhuma reserva encontrada para este docente.');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const handleRetirarChave = async (reserva) => {
    const idDocente = reserva.docentes_id;

    if (!idDocente) {
      console.error('ID do docente não encontrado na reserva.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/reservas/retirar-chave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_docente: idDocente })
      });

      if (response.ok) {
        console.log('Chave retirada com sucesso!');
        setRetiradaChave((prevState) => ({
          ...prevState,
          [reserva.id]: true, // Marca a reserva como tendo a chave retirada
        }));
        fetchReservas();
        setAviso({ ativo: true, mensagem: 'Chave retirada com sucesso!' });
      } else {
        const errorData = await response.json();
        console.error('Erro ao retirar chave:', errorData.message);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  const handleDevolverChave = async (reserva) => {
    const idDocente = reserva.docentes_id;
  
    if (!retiradaChave[reserva.id]) {
      // Notificação quando o botão está desativado
      setAviso({ ativo: true, mensagem: 'Você precisa retirar a chave antes de devolvê-la!' });
      return;
    }
  
    if (!idDocente) {
      console.error('ID do docente não encontrado na reserva.');
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:5000/api/reservas/devolver-chave`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id_docente: idDocente })
      });
  
      if (response.ok) {
        console.log('Chave devolvida com sucesso!');
        setRetiradaChave((prevState) => ({
          ...prevState,
          [reserva.id]: false, // Marca a reserva como tendo a chave devolvida
        }));
        fetchReservas();
        setAviso({ ativo: true, mensagem: 'Chave devolvida com sucesso!' }); // Notificação de sucesso
      } else {
        console.error('Erro ao devolver chave:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };
  

  const fecharAviso = () => {
    setAviso({ ativo: false, mensagem: '' });
  };

  return (
    <>
      <Top1 />
      <button className="back-button" onClick={handleBack}>
        <FaArrowLeft /> Voltar
      </button>

      {aviso.ativo && (
        <div className="aviso-overlay">
          <div className="aviso-container">
            <p>{aviso.mensagem}</p>
            <button onClick={fecharAviso}>OK</button>
          </div>
        </div>
      )}

      {aviso.ativo && (
        <div className="aviso-overlay">
          <div className="aviso-container">
            <p>{aviso.mensagem}</p>
            <button onClick={fecharAviso}>OK</button>
          </div>
        </div>
      )}


      <div className="reservas-lista">
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div key={reserva.id}>
              <h2>Bem-vindo {reserva.docente_nome} <FontAwesomeIcon icon={faLockOpen} style={{ marginLeft: '20px', color: 'black' }} /></h2>
              <div className="reserva-item">
                <h3>Reserva do Docente</h3>
                <div className="reservas-columns">
                  <div className="column">
                    <div className="info-balao">
                      <p className="info-sala">Sala: {reserva.sala_nome}</p>
                    </div>
                    <div className="info-balao">
                      <p className="info-curso">Curso: {reserva.curso_nome}</p>
                    </div>
                    <div className="info-balao">
                      <p className="info-turma">Turma: {reserva.turma_nome}</p>
                    </div>
                  </div>
                  <div className="column">
                    <div className="info-balao">
                      <p className="info-disciplina">Disciplina: {reserva.disciplina_nome}</p>
                    </div>
                    <div className="info-balao">
                      <p className="info-horario">Horário Inicial: {reserva.horario_inicial}</p>
                    </div>
                    <div className="info-balao">
                      <p className="info-data">Data: {new Date(reserva.data).toLocaleDateString('pt-BR')}</p>
                    </div>
                  </div>
                </div>

                <div className="buttons-container">
                  <button onClick={() => handleRetirarChave(reserva)}>Retirar chave</button>
                  <button
                    onClick={() => handleDevolverChave(reserva)}
                    disabled={!retiradaChave[reserva.id]} // Desativa até que "Retirar chave" seja clicado
                  >
                    Devolver chave
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Não há reservas encontradas para este docente.</p>
        )}
      </div>
      <Rodape />
    </>
  );
}

export default HomeDocente;
