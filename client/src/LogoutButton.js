import React from 'react';
import { useNavigate  } from 'react-router-dom'; // Importa o hook useHistory do React Router

function LogoutButton() {
  let navigate = useNavigate (); // Permite acessar a instância do histórico para redirecionamento

  const handleLogout = () => {
    // Aqui você pode adicionar qualquer lógica adicional de limpeza necessária para o logout
    navigate.push('/login'); // Redireciona o usuário para a tela de login
  };

  return (
    <button onClick={handleLogout}>
      Logout
    </button>
  );
}

export default LogoutButton;