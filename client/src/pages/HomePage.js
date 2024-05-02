import React from "react";
import "./HomePage.css";
import { useAppContext } from "../AppContext"; // Importe o hook personalizado
import { useAuth } from '../AuthContext';
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { listOfStorage, filterCategory, setFilterCategory } = useAppContext(); // Use o contexto
  const { user, logout } = useAuth();
  
  let navigate = useNavigate();


  const handleLogout = () => {
    logout();
    navigate('/'); // Redireciona para a homepage após o logout
  };

  return (
    <div className="homeContainer">
      {user && (
        <div>
          <h1 className="welcomeMessage">Bem-vindo, {user.name}!</h1>
          {/* Exibir mais informações do usuário se necessário */}
        </div>
      )}
      {user ? (
        <buttonLogin onClick={handleLogout}>Logout</buttonLogin>
      ) : (
        <buttonLogin onClick={() => navigate('/login')}>Login</buttonLogin>
      )}
      
      <div className="column">
        <h2 className="columnTitle">Estoque</h2>
        <div className="filterContainer">
          <select
            onChange={(e) => setFilterCategory(e.target.value)}
            value={filterCategory}
          >
            <option value="">Todas as Categorias</option>
            <option value="Bebida">Bebida</option>
            <option value="Sobremesa">Sobremesa</option>
            <option value="Entrada">Entrada</option>
            <option value="Principal">Principal</option>
          </select>
        </div>
        <div className="scrollContainer">
          {listOfStorage
            .filter(
              (storage) =>
                filterCategory === "" || storage.categoria === filterCategory
            )
            .map((storage) => (
              <div className="card" key={storage._id}>
                {" "}
                {/* Certifique-se de usar o identificador correto do seu item aqui */}
                <h1>Nome: {storage.nome}</h1>
                <h1>Quantidade: {storage.quantidade}</h1>
                <h1>Valor: {storage.valor}</h1>
                <h1>Categoria: {storage.categoria}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
