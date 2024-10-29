import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Top2 from "../../Top/Top2";
import './HomeDocente.css';

function HomeDocente() {
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

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
      console.log('Reservas recebidas:', data); // Para verificar a estrutura recebida
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
  }, [navigate]);

  const handleRetirarChave = async (reserva) => {
    const idDocente = reserva.docentes_id; // Ajuste baseado na estrutura real

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
        body: JSON.stringify({ id_docente: idDocente }) // Envia o ID do docente
      });

      if (response.ok) {
        console.log('Chave retirada com sucesso!');
        fetchReservas(); // Recarrega reservas para exibir horário atualizado
      } else {
        const errorData = await response.json();
        console.error('Erro ao retirar chave:', errorData.message);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  const handleDevolverChave = async (reserva) => {
    const idDocente = reserva.docentes_id; // Ajuste baseado na estrutura real

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
        body: JSON.stringify({ id_docente: idDocente }) // Envia o ID do docente
      });

      if (response.ok) {
        console.log('Chave devolvida com sucesso!');
        fetchReservas(); // Recarrega reservas para exibir horário atualizado
      } else {
        console.error('Erro ao devolver chave:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  return (
    <>
      <Top2 />
      <div className="reservas-lista">
        {reservas.length > 0 ? (
          reservas.map((reserva) => (
            <div key={reserva.id}>
              <h2>Seja bem-vindo {reserva.docente_nome}</h2>
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
                      <p className="info-data">Data: {reserva.data}</p>
                    </div>
                  </div>
                </div>

                <div className="buttons-container">
                  <button onClick={() => handleRetirarChave(reserva)}>Retirar chave</button>
                  <button 
                    onClick={() => handleDevolverChave(reserva)}
                    disabled={!reserva.horario_inicial} // Desabilita se o horário inicial não estiver definido
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
    </>
  );
}

export default HomeDocente;
