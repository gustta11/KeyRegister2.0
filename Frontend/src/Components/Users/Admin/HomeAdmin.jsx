import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeAdmin.css';
import Top1 from '../../Top/Top1';
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Rodape from '../../Rodapé/Rodape';

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

  const handleImport = () => {
    alert("Função de importação ainda não implementada.");
    // Adicione aqui a lógica para importar os dados (exemplo: upload de arquivo)
  };

  useEffect(() => {
    fetchReservas();
  }, []);

  const fetchReservas = (params = {}) => {
    setLoading(true);
    setError(null);
    axios
      .get("http://localhost:5000/api/reservas", { params })
      .then(response => {
        setReservas(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Erro ao buscar dados. Tente novamente.");
        setLoading(false);
      });
  };

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSearch = () => {
    fetchReservas(searchParams);
  };

  return (
    <>
      <Top1 />
      <div className="reservas-container">
        <button className="back-button" onClick={handleBack}>
          <FaArrowLeft /> Voltar
        </button>
        <div className="header">
          <h2>Reservas</h2>
          <button className="import-button" onClick={handleImport}>
            Importar
          </button>
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

        {/* Mensagem de carregamento ou erro */}
        {loading && <p className="loading">Carregando...</p>}
        {error && <p className="error">{error}</p>}

        {/* Tabela de reservas */}
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th>Sala</th>
                <th>Curso</th>
                <th>Turma</th>
                <th>Professor</th>
                <th>Disciplina</th>
                <th>Horário de Retirada</th>
                <th>Horário de Devolução</th>
              </tr>
            </thead>
            <tbody>
              {reservas.length > 0 ? (
                reservas.map((reserva, index) => (
                  <tr key={index}>
                    <td>{reserva.sala_nome}</td>
                    <td>{reserva.curso_nome}</td>
                    <td>{reserva.turma_nome}</td>
                    <td>{reserva.docente_nome}</td>
                    <td>{reserva.disciplina_nome}</td>
                    <td>{reserva.horario_inicial}</td>
                    <td>{reserva.horario_final}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="no-data">
                    Nenhuma reserva encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <Rodape />
    </>
  );
};

export default Reservas;