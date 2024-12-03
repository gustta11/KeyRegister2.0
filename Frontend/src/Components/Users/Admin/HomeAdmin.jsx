import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeAdmin.css';
import Top1 from '../../Top/Top1';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';


const Reservas = () => {
  const navigate = useNavigate();
  const [reservas, setReservas] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState({
    docente_nome: '',
    curso_nome: '',
    sala_nome: '',
    disciplina_nome: '',
    data: '',
    horario_inicial: '',
    horario_final: ''
  });

  const handleBack = () => {
    navigate(-1); // Volta para a página anterior
  };


  // Carregar as reservas automaticamente na inicialização
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:5000/api/reservas")
      .then(response => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Erro ao carregar as reservas");
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = () => {
    setLoading(true);
    setError(null);
    axios.get("http://localhost:5000/api/reservas", { params: searchParams })
      .then(response => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Erro ao carregar as reservas");
        setLoading(false);
      });
  };

  if (loading) return <p className="loading">Carregando...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <>
    <Top1/>
    <div className="reservas-container">
    <button className="back-button" onClick={handleBack}>
          <FaArrowLeft /> Voltar
        </button>
      <div className="header">
        <h2>Reservas</h2>
      </div>

      {/* Formulário de pesquisa */}
      <div className="search-form">
        <input
          type="text"
          name="docente_nome"
          placeholder="Buscar por Docente"
          value={searchParams.docente_nome}
          onChange={handleSearchChange}
        />
        <input
          type="text"
          name="sala_nome"
          placeholder="Buscar por Sala"
          value={searchParams.sala_nome}
          onChange={handleSearchChange}
        />
        <input
          type="date"
          name="data"
          value={searchParams.data}
          onChange={handleSearchChange}
        />
      </div>

      {/* Botão de buscar */}
      <div className="search-button-container">
        <button onClick={handleSearch}>Buscar</button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Docente</th>
              <th>Turma</th>
              <th>Sala</th>
              <th>Curso</th>
              <th>Disciplina</th>
              <th>Horário de Retirada</th>
              <th>Horário de Devolução</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map((reserva, index) => (
              <tr key={index}>
                <td>{reserva.docente_nome}</td>
                <td>{reserva.turma_nome}</td>
                <td>{reserva.sala_nome}</td>
                <td>{reserva.curso_nome}</td>
                <td>{reserva.disciplina_nome}</td>
                <td>{reserva.horario_inicial}</td>
                <td>{reserva.horario_final}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default Reservas;