import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Top2 from "../../Top/Top2";
import './HomeDocente.css';

function HomeDocente() {
  // Estado para armazenar as reservas do docente
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate();

  // Função para buscar as reservas do docente com base na matrícula
  const fetchReservas = async () => {
    // Recupera a matrícula do docente do localStorage
    const matricula = localStorage.getItem('matricula_docente');

    // Se não houver matrícula salva, redireciona para a página de login
    if (!matricula) {
      navigate('/login');
      return;
    }

    try {
      // Faz uma requisição para buscar as reservas do docente usando a matrícula
      const response = await fetch(`http://localhost:5000/api/reservas/matricula`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ matricula_docentes: matricula })
      });

      // Verifica se a resposta da API é bem-sucedida
      if (!response.ok) {
        console.error('Erro ao buscar reservas:', response.statusText);
        return;
      }

      // Converte os dados da resposta para JSON
      const data = await response.json();
      console.log("Dados recebidos:", data);

      // Verifica se há dados de reserva e atualiza o estado
      if (Array.isArray(data) && data.length > 0) {
        setReservas(data);
      } else {
        console.error('Nenhuma reserva encontrada para este docente.');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
    }
  };

  // useEffect para carregar as reservas quando o componente for montado
  useEffect(() => {
    fetchReservas();
  }, [navigate]);


  // Função para marcar a retirada da chave
  const handleRetirarChave = async (reserva) => {
    try {
      // Faz uma requisição para o endpoint de retirada de chave
      const response = await fetch(`http://localhost:5000/api/reservas/retirar-chave`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id_docentes: reserva.docentes_id
        })
      });

      // Se a resposta for bem-sucedida, atualiza a lista de reservas
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

    // Função para marcar a devolução de chave
    const handleDevolverChave = async (reserva) => {
      try {
        // Faz uma requisição para o endpoint de devolucao de chave
        const response = await fetch(`http://localhost:5000/api/reservas/devolverr-chave`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id_docentes: reserva.docentes_id
          })
        });
  
        // Se a resposta for bem-sucedida, atualiza a lista de reservas
        if (response.ok) {
          console.log('Chave devolvida com sucesso!');
          fetchReservas(); // Recarrega as reservas para exibir o horário atualizado do banco de dados
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
          reservas.map((reserva, index) => (
            <div key={index}>
              <h2>Seja bem-vindo {reserva.docente_nome}</h2>
              <div className="reserva-item">
                <h3>Reserva do Docente</h3>
                {/* Exibição de informacoes da tabela reservas e das outras tabelas que estão ligadas a tabelas */}
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

                {/* Manipulação de botão */}
                <div className="buttons-container">

                  <button onClick={() => handleRetirarChave(reserva)}>Retirar chave</button>
                  {/* tentativa de fazer com que o botão para devolver a chave fique desativado por padrão */}
                  <button onClick={() => handleDevolverChave(reserva)}>Devolver chave</button>
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
