import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
//import { useAppContext } from '../AppContext';
import { useAuth } from '../AuthContext';
import './LoginPage.css'; // Importe o CSS aqui

const LoginPage = () => {
    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [loginError, setLoginError] = useState(false);
    const { handleLogin } = useAuth();
    let navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const isAuthenticated = handleLogin({ name, cpf });
        console.log(isAuthenticated);
        if(isAuthenticated){
            navigate('/'); // Redireciona para a HomePage
        }else{
            setLoginError(true);
        }
        
    };



    return (
        <div className="loginContainer">
          <form onSubmit={handleSubmit} className="loginForm">
            <h1>Entrar</h1>
            <div>
              <label htmlFor="name">Nome de Usuário</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="cpf">CPF</label>
              <input
                type="password" // Usar tipo password para esconder a entrada
                id="cpf"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
                required
              />
            </div>
            <button type="submit">Entrar</button>
            {loginError && <p style={{ color: 'red' }}>Usuário ou senha incorretos.</p>}
          </form>
        </div>
      );
}

export default LoginPage