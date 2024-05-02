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
      return true; // user found
    } else {
      return false; // user not found
    }
  };

  const logout = () => {
    setUser(null); // Remove o usuário do estado, efetuando o logout
  };

  const value = {
    logout,
    handleLogin,
    user,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
); 

};