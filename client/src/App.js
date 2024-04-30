import "./App.css";
import { useState, useEffect } from "react";
import LoginPage from './LoginPage';
//import LogoutButton from "./LogoutButton";
import Axios from "axios";
import React from 'react';
// import HomePage from './HomePage'; // Importe a página inicial ou outra página protegida

//import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfStorage, setListOfStorage] = useState([]);
  const [filterCategory, setFilterCategory] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3000/estoque").then((response) => {
      setListOfStorage(response.data);
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:3000/users").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const handleLogin = (userInfo) => {
    // Encontra o usuário na lista de usuários que corresponde ao nome e ao CPF fornecidos
    const userFound = listOfUsers.find(user => user.name === userInfo.name && user.cpf === userInfo.cpf);
  
    if (userFound) {
      // Usuário encontrado e credenciais correspondem
      setUser(userFound); // Atualiza o estado do usuário com as informações do usuário encontrado
    } else {
      // Usuário não encontrado ou credenciais não correspondem
      // Aqui você pode definir como lidar com falhas de login (exibir mensagem, etc.)
      alert("Usuário ou senha incorretos!"); // Exemplo simples de feedback
    }
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  

  return (
    <div className="App">
      <div className="column">
        <h2 className="columnTitle">Estoque</h2>
        <div className="filterContainer">
          <select onChange={(e) => setFilterCategory(e.target.value)} value={filterCategory}>
            <option value="">Todas as Categorias</option>
            <option value="Bebida">Bebida</option>
            <option value="Sobremesa">Sobremesa</option>
            <option value="Entrada">Entrada</option>
            <option value="Principal">Principal</option>
          </select>
        </div>
        <div className="scrollContainer">
          {listOfStorage
            .filter((storage) => filterCategory === '' || storage.categoria === filterCategory)
            .map((storage) => (
              <div className="card" key={storage._id}> {/* Certifique-se de usar o identificador correto do seu item aqui */}
                <h1>Nome: {storage.nome}</h1>
                <h1>Quantidade: {storage.quantidade}</h1>
                <h1>Valor: {storage.valor}</h1>
                <h1>Categoria: {storage.categoria}</h1>
              </div>
            ))}
        </div>
      </div>
      
      <div className="column">
        <h2 className="columnTitle">Usuários</h2>
        <div className="scrollContainer">
          {listOfUsers.map((user) => (
            <div className="card" key={user.cpf}> {/* Assumindo que o CPF é único para cada usuário */}
              <h1>Nome: {user.name}</h1>
              <h1>Idade: {user.age}</h1>
              <h1>CPF: {user.cpf}</h1>
              <h1>Flamengo: {JSON.stringify(user.flamengo)}</h1>
            </div>
          ))}
         
        </div>
      </div>


  
    </div>
  );
}

export default App;