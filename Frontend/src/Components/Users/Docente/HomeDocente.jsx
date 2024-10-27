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
      console.log("Dados recebidos:", data); 

      if (Array.isArray(data) && data.length > 0) {
        setReservas(data); 
      } else {
        console.error('Nenhuma reserva encontrada para este docente.'); 
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error); 
    }
  };

  useEffect(() => {
    fetchReservas(); 
  }, [navigate]); 

  const handleRetirarChave = async (reserva) => {
    try {
      const response = await fetch(`http://localhost:5000/api/reservas/retirar`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_docentes: reserva.docentes_id
        })
      });

      if (response.ok) {
        console.log('Chave retirada com sucesso!');
        fetchReservas(); // Recarrega as reservas para exibir o horário atualizado do banco de dados
      } else {
        console.error('Erro ao retirar chave:', response.statusText);
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
          reservas.map((reserva, index) => (
            <div key={index}>
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
                  <button disabled>Devolver chave</button>
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
