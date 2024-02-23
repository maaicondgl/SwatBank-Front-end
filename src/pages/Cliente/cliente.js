import React, { useState, useEffect } from 'react';
import './styles.css';
import { useNavigate} from 'react-router-dom';
import api from '../../services/api';
import Menu from "../menu/menu";

export default function ClienteForm() {

  const [nome, setNome] = useState();
  const [cpf, setCpf] = useState('');
  const [rg, setRg] = useState('');
  const[idConta, setIdConta] = useState('')
  const navigate = useNavigate();

  async function createNewClient(e) {
    e.preventDefault();
    
    const data = {
      cpf,
      rg,
      nome,
      contaBancaria: {
        idConta // incluir o ID da conta bancária no corpo da requisição
      }
    };
    console.log("Dados Enviados:", data);

    try {
      const response = await api.post('cliente', data);
      
      console.log("URL da API:", 'cliente');
      navigate('/ListaContas'); 
    } catch (error) {
      alert('Erro ao criar Cliente!');
      console.log("URL da API:", 'cliente');
    }
  }

  return (
    <>
      <Menu/>
      <form onSubmit={createNewClient} method="post">
        <h1>Cliente</h1>

        <label htmlFor="name">Name:</label>
        <input type="text" id="name" name="name" value={nome} onChange={e => setNome(e.target.value)} required />

        <label htmlFor="phoneNumber">CPF:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" value={cpf} onChange={e => setCpf(e.target.value)} required />

        <label htmlFor="rg">RG:</label>
        <input type="text" id="rg" name="rg" value={rg} onChange={e => setRg(e.target.value)} required />
        
        <label htmlFor="idConta">ID da Conta Bancária:</label>
        <input type="text" id="idConta" name="idConta" value={idConta} onChange={e => setIdConta(e.target.value)} required />
              <button type="submit">Enviar</button>
      </form>
    </>
  );
};