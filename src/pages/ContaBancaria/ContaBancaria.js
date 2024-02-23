import React, {useState} from 'react';
import { useNavigate} from 'react-router-dom';
import Menu from "../menu/menu";
import api from '../../services/api'
export default function ContaBancariaForm () {
  
  const[idConta, setIdConta] = useState('')
  const[conta, setConta ] = useState('')
  const[agencia, setAgencia ] = useState('')
  const[saldo, setSaldo ] = useState('')
  const[limite, setLimite ] = useState('')
  const[chequeEspecial, setChequeEspecial] = useState('')

  const navigate = useNavigate();
  
  async function createNewAccount(e){
      e.preventDefault();
      const data = {
        idConta,
        conta,
        agencia,
        saldo,
        limite,
        chequeEspecial
      }

      try {
        const response = await api.post('contaBancaria', data)
        navigate('/ContaBancaria'); 
      } catch (error) {
         alert('Erro ao criar Conta!')
      }

  }

  return (
    <>
        <Menu/>
      <div className='contaBancariaContainer'>
        <form onSubmit={createNewAccount} method="post">
        <label htmlFor="idConta">ID Conta:</label>
        <input type="text" id="idConta" name="idConta" value={idConta} onChange={e => setIdConta(e.target.value)} required />
            <label htmlFor="nomeBanco">Conta:</label>
            <input type="text" id="nomeBanco" name="nomeBanco" value={conta} onChange={e => setConta(e.target.value)} required/>

            <label htmlFor="agenciaBancaria">Agência:</label>
            <input type="text" id="agenciaBancaria" name="agenciaBancaria" value={agencia} onChange={e => setAgencia(e.target.value)} required />

            <label htmlFor="conta">Saldo:</label>
            <input type="text" id="conta" name="conta" value={saldo} onChange={e => setSaldo(e.target.value)} required/>

            <label htmlFor="saldo">Limite:</label>
            <input type="text" id="saldo" name="saldo" value={limite} onChange={e => setLimite(e.target.value)} required/>
            <button type="submit">Enviar</button>
        </form>
      </div>
    </>
  );
};
