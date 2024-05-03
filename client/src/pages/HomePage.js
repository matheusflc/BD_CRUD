import React, { useState } from "react";
import "./HomePage.css";
import Cart from "../components/Cart.js"; // Ajuste o caminho conforme necessário
import ProfileButton from "../components/ProfileButton";
import { useAppContext } from "../AppContext"; // Importe o hook personalizado
import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const {
    listOfStorage,
    filterCategory,
    setFilterCategory,
    addToCart,
    updateQuantity,
    logoutUser,
  } = useAppContext(); // Use o contexto
  const { user, logout } = useAuth();
  const [maxPrice, setMaxPrice] = useState("");
  const [filterMari, setFilterMari] = useState("");
  const [tempMaxPrice, setTempMaxPrice] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [lowStockFilter, setLowStockFilter] = useState(false);

  let navigate = useNavigate();

  const handleLogout = () => {
    logout();
    logoutUser();
    navigate("/"); // Redireciona para a homepage após o logout
  };

  const filteredStorage = listOfStorage.filter(
    (storage) =>
      (filterCategory === "" || storage.categoria === filterCategory) &&
      (maxPrice === "" || storage.valor <= maxPrice) &&
      (filterMari === "" || storage.mari.toString() === filterMari) &&
      storage.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!user?.vendedor || !lowStockFilter || storage.quantidade <= 5)
  );

  const QuantitySelector = ({ product }) => {
    const [quantity, setQuantity] = useState(1);

    return (
      <div className="quantity-selector">
        <button onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
          -
        </button>
        <span>{quantity}</span>
        <button onClick={() => setQuantity((q) => q + 1)}>+</button>
        <button
          onClick={() =>
            addToCart({ ...product, quantity: parseInt(quantity, 10) })
          }
        >
          Adicionar ao Carrinho
        </button>
      </div>
    );
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
        <div>
          <buttonLogin onClick={handleLogout}>Logout</buttonLogin>
          <ProfileButton />
        </div>
      ) : (
        <div>
          <buttonLogin
            classname="netflix-style-button"
            onClick={() => navigate("/login")}
          >
            Login
          </buttonLogin>
          <buttonSignup
            className="netflix-style-button"
            onClick={() => navigate("/signup")}
          >
            Sign Up
          </buttonSignup>
        </div>
      )}

      <div className="column">
        <Cart /> {/* Adiciona o componente do carrinho */}
        <h2 className="columnTitle">Estoque</h2>
        <div className="filterContainer">
          
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
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
          <select
            onChange={(e) => setFilterMari(e.target.value)}
            value={filterMari}
          >
            <option value="">Todos</option>
            <option value="true">Fabricado em Mari</option>
            <option value="false">Não Fabricado em Mari</option>
          </select>
          <input
            type="number"
            placeholder="Preço Máximo"
            value={tempMaxPrice}
            onChange={(e) => setTempMaxPrice(e.target.value)}
            style={{ marginLeft: "10px" }} // Ajuste o estilo conforme necessário
          />
          <button onClick={() => setMaxPrice(tempMaxPrice)}>Aplicar</button>
          {user?.vendedor && (
            <div>
              <label>
                <input
                  type="checkbox"
                  checked={lowStockFilter}
                  onChange={(e) => setLowStockFilter(e.target.checked)}
                />
                Mostrar itens com estoque baixo (menor ou = 5)
              </label>
            </div>
          )}
        </div>
        <div className="scrollContainer">
          {filteredStorage.length > 0 ? (
            filteredStorage.map((storage) => (
              <div className="card" key={storage._id}>
                <div className="card" key={storage._id}>
                  <h1>Nome: {storage.nome}</h1>
                  <h1>Quantidade: {storage.quantidade}</h1>
                  <h1>Valor: {storage.valor}</h1>
                  <h1>Categoria: {storage.categoria}</h1>
                  <h1>Fabricado em Mari: {storage.mari ? "Sim" : "Não"}</h1>
                  <QuantitySelector product={storage} />
                </div>
              </div>
            ))
          ) : (
            <div>Não há itens para esse filtro.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
