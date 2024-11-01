import { useNavigate } from "react-router-dom";
import Top1 from "../../Top/Top1";
import { useState } from "react";

const LoginDocente = () => {
  const [matricula, setMatricula] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/reservas/matricula', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ matricula_docentes: matricula }),
      });

      const data = await response.json();

      if (response.ok) {
        const idDocente = data.id_docentes; // Capture o ID aqui
        localStorage.setItem('matricula_docente', matricula);
        localStorage.setItem('id_docente', idDocente); // Salve o ID do docente

        navigate('/Componentes/Users/Docente/HomeDocente');
      } else {
        setError(data.message || 'Matrícula não encontrada');
      }
    } catch (error) {
      console.error('Erro ao conectar ao servidor:', error);
      setError('Erro ao conectar ao servidor. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Top1 />
      <div className="login-container">
        <h2>Login Docente</h2>
        <div className='icon-buttons'>
          <img className='photo' src={Docente} alt="Logo" />
          <form className='inputs-docente' onSubmit={handleSubmit}>
            <h3>Matrícula <LiaKeySolid /></h3>
            <input 
              type="text" 
              value={matricula} 
              onChange={(e) => setMatricula(e.target.value)} 
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
            {error && <p className="error-message">{error}</p>}
          </form>
        </div>
      </div>
    </>
  );
};

export default LoginDocente;
