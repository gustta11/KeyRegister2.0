import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HomeAdmin.css'

const Reservas = () => {
    const [reservas, setReservas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fazendo a requisição para a API
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

    if (loading) return <p className="loading">Carregando...</p>;
    if (error) return <p className="error">{error}</p>;

    return (
        <div className="reservas-container">
            {/* Título da página */}
            <div className="header">
                <h2>Reservas</h2>
            </div>

            {/* Tabela de Reservas */}
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
    );
};

export default Reservas;
