import React from 'react';
import { useAppContext } from '../AppContext'; // Ajuste o caminho conforme necessário
import { useNavigate } from 'react-router-dom'; // Importe useNavigate do React Router v6
import './ProfileButton.css'; // Certifique-se de que o caminho está correto

const ProfileButton = () => {
  const { isUserLoggedIn } = useAppContext();
  let navigate = useNavigate(); // Hook para navegação

  const goToUserProfile = () => {
    navigate('/user-profile'); // Caminho para a página de perfil do usuário
  };

  return (
    <>
      {isUserLoggedIn && (
        <buttonProfile className="netflix-style-button" onClick={goToUserProfile}>
          Perfil do Usuário
        </buttonProfile>
      )}
    </>
  );
};

export default ProfileButton;