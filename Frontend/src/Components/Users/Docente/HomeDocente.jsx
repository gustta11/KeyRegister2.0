import { useEffect, useState } from "react"; // Importando hooks para gerenciar o estado e os efeitos colaterais
import { useNavigate } from "react-router-dom"; // Importando hook para navegação
import Top2 from "../../Top/Top2"; // Importando o componente de topo
import Lease from '../../../../public/Lease.png'; // Importando imagem (se necessário)
import './HomeDocente.css'; // Importando estilos CSS

function HomeDocente() {
  // Definindo o estado para as reservas
  const [reservas, setReservas] = useState([]);
  const navigate = useNavigate(); // Inicializando o hook de navegação

  useEffect(() => {
    // Função para buscar reservas do docente
    const fetchReservas = async () => {
      const matricula = localStorage.getItem('matricula_docente'); // Obtendo matrícula do docente do localStorage
      if (!matricula) {
        navigate('/login'); // Se não houver matrícula, redireciona para a página de login
        return;
      }

      try {
        // Fazendo requisição para buscar reservas
        const response = await fetch(`http://localhost:5000/api/reservas/matricula`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ matricula_docentes: matricula }) // Enviando a matrícula no corpo da requisição
        });

        if (!response.ok) {
          console.error('Erro ao buscar reservas:', response.statusText); // Log de erro caso a requisição falhe
          return;
        }

        const data = await response.json(); // Convertendo a resposta em JSON
        console.log("Dados recebidos:", data); // Log dos dados recebidos

        if (Array.isArray(data) && data.length > 0) {
          setReservas(data); // Atualizando o estado com as reservas recebidas
        } else {
          console.error('Nenhuma reserva encontrada para este docente.'); // Log de erro se não houver reservas
        }
      } catch (error) {
        console.error('Erro ao conectar ao servidor:', error); // Log de erro em caso de falha de conexão
      }
    };

    fetchReservas(); // Chama a função para buscar reservas
  }, [navigate]); // Dependência para garantir que a navegação esteja sempre atualizada

  return (
    <>
      <Top2 /> {/* Componente de topo */}
      <div className="reservas-lista">
        {reservas.length > 0 ? (
          reservas.map((reserva, index) => (
            <div key={index}>
              <h2>Seja bem-vindo {reserva.docente_nome} </h2> {/* Nome do docente exibido */}
              <div className="reserva-item">
                <h3>Reserva do Docente </h3>
                <div className="reservas-columns">
                  <div className="column">
                    <div className="info-balao">
                      <p className="info-sala">Sala: {reserva.sala_nome}</p> {/* Informações da reserva */}
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
                      <p className="info-data">Data: {reserva.data}</p> {/* Data da reserva */}
                    </div>
                  </div>

                </div>

                <div className="buttons-container"> {/* Botões para retirar e devolver chave */}
                  <button onClick={() => navigate('/Components/Users/Docente/RetirarChave')}>Retirar chave</button>
                  <button onClick={() => navigate('/Components/Users/Docente/DevolverChave')}>Devolver chave</button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>Não há reservas encontradas para este docente.</p> // Mensagem caso não haja reservas
        )}
      </div>
    </>
  );
}

export default HomeDocente; // Exportando o componente
