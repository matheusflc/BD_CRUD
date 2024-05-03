// AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { useAppContext } from './AppContext';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const { listOfUsers } = useAppContext();
  const [user, setUser] = useState(null);

  const handleLogin = (userInfo) => {
    const userFound = listOfUsers.find(
      (user) => user.name === userInfo.name && user.cpf === userInfo.cpf
    );
    if (userFound) {
      setUser(userFound);
      return true;  // user found
    } else {
      return false; // user not found
    }
  };

  const logout = () => {
    setUser(null); // Remove o usuário do estado, efetuando o logout
  };

  const updateUserData = async (userId) => {
    try {
      const response = await fetch(`http://localhost:3000/users/${userId}`, { // Adiciona o ID do usuário na URL
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
      if (!response.ok) {
        throw new Error('Falha ao buscar dados do usuário');
      }
      const userData = await response.json();
      setUser(userData); // Atualiza o estado do usuário com os novos dados, incluindo purchaseHistory
    } catch (error) {
      console.error("Erro ao atualizar dados do usuário:", error);
    }
  };

  
  const value = {
    logout,
    updateUserData,
    handleLogin,
    user,
  };

  

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
); 

};