import React from 'react';
import { NavLink } from 'react-router-dom';
import './menu.css';

export default function Menu () {
  return (
    <header className='menu-bg'>
        <div class="superinfo-bg">
            <div class="superinfo">
                <p>Seg / Sex - 07:00 às 22:00</p>
                <a href="tel:+552199999999">+55 21 9999-9999</a>
                <p>Av. Brig. Faria Lima, 3458, São Paulo - SP</p>
            </div>
        </div>
        <div class="menu-logo">
            <a href="#">SwatBank</a>
        </div>
        <div class="menu">
            <nav className='menu-nav'>
                <ul>
                    <li>
                        <NavLink to="/ContaBancaria" activeClassName="ativo">
                        Conta
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/" activeClassName="ativo">
                        Cliente
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/ListaContas" activeClassName="ativo">
                        Lista Contas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/ListaCliente" activeClassName="ativo">
                        Lista Cliente
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/extrato" activeClassName="ativo">
                        Extrato
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </header>    
  );
};