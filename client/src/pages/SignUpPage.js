import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import './SignUpPage.css'; // Certifique-se de importar o CSS

const SignUpPage = () => {
  const [userData, setUserData] = useState({
    name: '',
    age: '',
    cpf: '',
    contato: [],
    flamengo: false,
    one_piece: false,
    sousa: false,
    vendedor: false,
  });

  let navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData(prevState => ({
      ...prevState,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await Axios.post('http://localhost:3000/users', userData);
      navigate('/');
    } catch (error) {
      console.error("Erro ao cadastrar usuário:", error);
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-container">
        <h1>Cadastre-se</h1>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Nome" value={userData.name} onChange={handleChange} required />
          <input type="number" name="age" placeholder="Idade" value={userData.age} onChange={handleChange} required />
          <input type="text" name="cpf" placeholder="CPF" value={userData.cpf} onChange={handleChange} required />
          {/* Campos de contato e preferências */}
          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="flamengo" checked={userData.flamengo} onChange={handleChange} />
              Torce para o Flamengo?
            </label>
            <label>
              <input type="checkbox" name="one_piece" checked={userData.one_piece} onChange={handleChange} />
              Assiste One Piece?
            </label>
            <label>
              <input type="checkbox" name="sousa" checked={userData.sousa} onChange={handleChange} />
              Nasceu em Sousa?
            </label>
            <label>
              <input type="checkbox" name="vendedor" checked={userData.vendedor} onChange={handleChange} />
              É um Vendedor?
            </label>
          </div>
          <button type="submit">Cadastrar</button>
        </form>
        <div className="signin-redirect">
          Já tem uma conta? <span onClick={() => navigate('/login')}>Entrar</span>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;