import React, { useState } from 'react';
import ClienteForm from '../Cliente/cliente';
import api from '../../services/api';
import './styles.css';
import Menu from "../menu/menu";
import { useNavigate} from 'react-router-dom';

export default function Index() {

  const [dadosCliente, setDadosCliente] = useState({});
  const [dadosContaBancaria, setDadosContaBancaria] = useState({});

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Enviar dados do cliente
      const responseCliente = await api.post('cliente', dadosCliente);
      console.log('Resposta do Cliente:', responseCliente.data);

      // Enviar dados da conta bancária
      const responseContaBancaria = await api.post('contaBancaria', dadosContaBancaria);
      console.log('Resposta da Conta Bancária:', responseContaBancaria.data);

      // Redirecionar após o envio bem-sucedido dos dois formulários
      // navigate('/ListaContas');
    } catch (error) {
      console.error('Erro ao enviar dados:', error);
      alert('Erro ao enviar dados!');
    }
  };

  const handleClienteFormChange = (novosDados) => {
    setDadosCliente(novosDados);
  };

  const handleContaBancariaFormChange = (novosDados) => {
    setDadosContaBancaria(novosDados);
  };

  return (
    <>
      <Menu/>
      <form onSubmit={handleSubmit}>
        <ClienteForm onChange={handleClienteFormChange} />
        
      </form>
    </>
  );
};