import React, { useState, useEffect } from "react";
import { FiPower, FiEdit, FiTrash2 } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import './styleConta.css';
import Menu from "../menu/menu";

import api from '../../services/api';

export default function ListaContaBancaria() {
  const [listaContaBancaria, setListaContaBancaria] = useState([]);
  const [editingId, setEditingId] = useState(null); // ID do item sendo editado

  const navigate = useNavigate();

  async function loadAccountList() {
    try {
      const response = await api.get('/contaBancaria');
      setListaContaBancaria(response.data);
    } catch (error) {
      alert('Houve uma falha ao carregar a lista de contas bancárias!');
      console.error(error);
    }
  }

  async function deleteAccount(idConta){
    try {
      await api.delete(`/contaBancaria/excluir/${idConta}`);
      setListaContaBancaria(listaContaBancaria.filter(item => item.idConta !== idConta));

       // Recarrega a lista de contas bancárias após a exclusão
       loadAccountList();

    } catch (error) {
      alert('Houve uma falha  executar a operação delete! ')
    }
  }

  async function editAccount(idConta, newData) {
    try {
      await api.put(`/contaBancaria`, newData);
      // Recarrega a lista de contas bancárias após a edição
      loadAccountList();
      setEditingId(null); // Finaliza a edição
    } catch (error) {
      alert('Houve uma falha ao executar a operação de edição!');
      console.error(error);
    }
  }

  useEffect(() => {
    loadAccountList();
  }, []);

  // Função para renderizar os inputs de edição
  function renderEditFields(contaBancaria) {
    return (
      <>
        <strong>ID Conta:</strong>
        <input type="text" value={contaBancaria.idConta} readOnly />
        <strong>Agência Bancária:</strong>
        <input type="text" value={contaBancaria.agencia} onChange={(e) => handleFieldChange(e, contaBancaria, 'agencia')} />
        <strong>Número da Conta:</strong>
        <input type="text" value={contaBancaria.conta} onChange={(e) => handleFieldChange(e, contaBancaria, 'conta')} />
        <strong>Saldo:</strong>
        <input type="text" value={contaBancaria.saldo} onChange={(e) => handleFieldChange(e, contaBancaria, 'saldo')} />
        <strong>Limite:</strong>
        <input type="text" value={contaBancaria.limite} onChange={(e) => handleFieldChange(e, contaBancaria, 'limite')} />
        <strong>Cheque Especial:</strong>
        <input type="text" value={contaBancaria.chequeEspecial} onChange={(e) => handleFieldChange(e, contaBancaria, 'chequeEspecial')} />
        <strong>Juros da conta:</strong>
        <input type="text" value={contaBancaria.jurosChequeEspecial} onChange={(e) => handleFieldChange(e, contaBancaria, 'jurosChequeEspecial')} />

        <button onClick={() => handleSaveEdit(contaBancaria)}>Salvar</button>
      </>
    );
  }

  // Função para lidar com a alteração dos campos de edição
  function handleFieldChange(e, contaBancaria, field) {
    const { value } = e.target;
    setListaContaBancaria(listaContaBancaria.map(item => {
      if (item.idConta === contaBancaria.idConta) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  }

  // Função para iniciar a edição do item
  function handleStartEdit(idConta) {
    setEditingId(idConta);
  }

  // Função para salvar as alterações do item
  function handleSaveEdit(contaBancaria) {
    editAccount(contaBancaria.idConta, contaBancaria);
  }

  return (
    <>
      <body>
        <div>
          <Menu />
        </div>
        <h1>Lista de Contas</h1>
        <div className="lista-container">
          <ul>
            {listaContaBancaria.map(contaBancaria => (
              <li key={contaBancaria.idConta}>
                {editingId === contaBancaria.idConta ? renderEditFields(contaBancaria) : (
                  <>
                    <strong>ID Conta:</strong>
                    <p>{contaBancaria.idConta}</p>
                    <strong>Agência Bancária:</strong>
                    <p>{contaBancaria.agencia}</p>
                    <strong>Número da Conta:</strong>
                    <p>{contaBancaria.conta}</p>
                    <strong>Saldo:</strong>
                    <p>{contaBancaria.saldo}</p>
                    <strong>Limite:</strong>
                    <p>{contaBancaria.limite}</p>
                    <strong>Cheque Especial:</strong>
                    <p>{contaBancaria.chequeEspecial}</p>
                    <strong>Juros da conta:</strong>
                    <p>{contaBancaria.jurosChequeEspecial}</p>

                    <button onClick={() => handleStartEdit(contaBancaria.idConta)} type="button">
                      <FiEdit size={20} color="#251FC5" />
                    </button>

                    <button onClick={() => deleteAccount(contaBancaria.idConta)} type="button">
                      <FiTrash2 size={20} color="#FF0000" />
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        </div>
      </body>
    </>
  );
}
