import React, { useState, useEffect } from "react";
import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './styleListaCliente.css';
import Menu from "../menu/menu";
import api from '../../services/api';

export default function ListaCliente() {
  const [listaCliente, setListaCliente] = useState([]);
  const [editingData, setEditingData] = useState(null); // Dados do cliente em edição
  const navigate = useNavigate();

  useEffect(() => {
    loadClientList();
  }, []);

  async function loadClientList() {
    try {
      const response = await api.get('/cliente');
      setListaCliente(response.data);
    } catch (error) {
      alert('Houve uma falha ao carregar a lista de clientes!');
      console.error(error);
    }
  }

  async function deleteClient(cpf) {
    try {
      await api.delete(`/cliente/excluir/${cpf}`);
      setListaCliente(listaCliente.filter(cliente => cliente.cpf !== cpf));
    } catch (error) {
      alert('Houve uma falha ao excluir o cliente!');
      console.error(error);
    }
  }

  async function saveClientEdit() {
    try {
      await api.put(`/cliente/${editingData.cpf}`, editingData);
      setEditingData(null); // Finaliza a edição
    } catch (error) {
      alert('Houve uma falha ao salvar as alterações do cliente!');
      console.error(error);
    }
  }

  // Função para iniciar a edição do item
  function handleStartEdit(cliente) {
    setEditingData(cliente);
  }

  // Função para cancelar a edição do item
  function handleCancelEdit() {
    setEditingData(null);
  }

  // Função para lidar com a alteração dos campos de edição
  function handleFieldChange(e, field) {
    const { value } = e.target;
    setEditingData({ ...editingData, [field]: value });
  }

  // Função para renderizar os inputs de edição
  function renderEditFields(cliente) {
    return (
      <>
        <strong>Nome:</strong>
        <input type="text" value={editingData.nome} onChange={(e) => handleFieldChange(e, 'nome')} />
        <strong>RG:</strong>
        <input type="text" value={editingData.rg} onChange={(e) => handleFieldChange(e, 'rg')} />
        <strong>CPF:</strong>
        <input type="text" value={editingData.cpf} onChange={(e) => handleFieldChange(e, 'cpf')} />
        <strong>Conta Bancária:</strong>
        <input type="text" value={editingData.contaBancaria ? editingData.contaBancaria.idConta : ''} onChange={(e) => handleFieldChange(e, 'contaBancaria')} />

        <button onClick={() => saveClientEdit()}>Salvar</button>
        <button onClick={() => handleCancelEdit()}>Cancelar</button>
      </>
    );
  }

  return (
    <>
      <div>
        <Menu />
      </div>
      <h1>Lista Clientes</h1>
      <div className="lista-container">
        <ul>
          {listaCliente.map(cliente => (
            <li key={cliente.cpf}>
              {editingData && editingData.cpf === cliente.cpf ? renderEditFields(cliente) : (
                <>
                  <strong>Nome:</strong>
                  <p>{cliente.nome}</p>
                  <strong>RG:</strong>
                  <p>{cliente.rg}</p>
                  <strong>CPF:</strong>
                  <p>{cliente.cpf}</p>
                  <strong>Conta Bancária:</strong>
                  <p>{cliente.contaBancaria ? cliente.contaBancaria.idConta : ''}</p>

                  <button onClick={() => handleStartEdit(cliente)} type="button">
                    <FiEdit size={20} color="#251FC5" />
                  </button>

                  <button onClick={() => deleteClient(cliente.cpf)} type="button">
                    <FiTrash2 size={20} color="#FF0000" />
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
