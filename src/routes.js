import React from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Cadastro from "./pages/Cliente/cliente";
import ContaBancariaForm from "./pages/ContaBancaria/ContaBancaria";
import ListaContaBancaria from "./pages/ContaBancaria/ListaContas";
import ListaCliente from "./pages/Cliente/ListaClientes";
import Menu from "./pages/menu/menu";

export default function RoutesApp(){
    return(
        <Router>
            <Routes>
                <Route path="/" element={<Cadastro/>} />
                <Route path="/ContaBancaria" element={<ContaBancariaForm />} />
                <Route path="/ListaContas" element={<ListaContaBancaria />} />
                <Route path="/Menu" element={<Menu />} />
                <Route path="/ListaCliente" element={<ListaCliente />} />

            </Routes>
        </Router>
    );
}