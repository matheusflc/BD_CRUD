// AppContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfStorage, setListOfStorage] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  //const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3000/estoque").then((response) => {
      setListOfStorage(response.data);
    });
    Axios.get("http://localhost:3000/users").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

//   const handleLogin = (userInfo) => {
//     const userFound = listOfUsers.find(
//       (user) => user.name === userInfo.name && user.cpf === userInfo.cpf
//     );
//     if (userFound) {
//       setUser(userFound);
//       return true;
//     } else {
//       return false; // user not found
//     }
//   };

  const value = {
    listOfUsers,
    listOfStorage,
    filterCategory,
    setFilterCategory,
    //user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
