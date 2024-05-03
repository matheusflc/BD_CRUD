// AppContext.js
import React, { createContext, useContext, useState, useEffect } from "react";
import Axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [listOfUsers, setListOfUsers] = useState([]);
  const [listOfStorage, setListOfStorage] = useState([]);
  const [filterCategory, setFilterCategory] = useState("");
  const [cart, setCart] = useState([]);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [selectedSeller, setSelectedSeller] = useState("");
  //const [user, setUser] = useState(null);

  useEffect(() => {
    Axios.get("http://localhost:3000/estoque").then((response) => {
      setListOfStorage(response.data);
    });
    Axios.get("http://localhost:3000/users").then((response) => {
      setListOfUsers(response.data);
    });
  }, []);

  const addToCart = (product, quantityToAdd) => {
    const availableQuantity = product.quantidade; // Supondo que 'quantity' é a quantidade disponível do produto
    const parsedQuantityToAdd = product.quantity;

    if (isNaN(parsedQuantityToAdd) || parsedQuantityToAdd <= 0) {
      console.error("Quantidade inválida", quantityToAdd);
      return;
    }

    setCart((currentCart) => {
      const productExists = currentCart.find(
        (item) => item._id === product._id
      );
      if (productExists) {
        // Calcula a nova quantidade pretendida
        const newQuantity = productExists.quantity + parsedQuantityToAdd;
        if (newQuantity > availableQuantity) {
          alert(
            `Quantidade máxima disponível para ${product.nome} é ${availableQuantity}.`
          );
          return currentCart; // Retorna o carrinho atual sem alterações
        }
        // Atualiza a quantidade do produto no carrinho
        return currentCart.map((item) =>
          item._id === product._id ? { ...item, quantity: newQuantity } : item
        );
      } else {
        // Adiciona o produto ao carrinho se a quantidade desejada não excede a disponível
        if (parsedQuantityToAdd > availableQuantity) {
          alert(
            `Quantidade máxima disponível para ${product.nome} é ${availableQuantity}.`
          );
          return currentCart; // Retorna o carrinho atual sem alterações
        }
        return [...currentCart, { ...product, quantity: parsedQuantityToAdd }];
      }
    });
  };

  const removeFromCart = (productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item._id !== productId)
    );
  };

  const updateQuantity = (productId, amount) => {
    setCart((currentCart) =>
      currentCart.map((item) => {
        if (item._id === productId) {
          const availableQuantity = item.quantityAvailable; // Supondo que 'quantityAvailable' é a quantidade disponível
          const newQuantity = item.quantity + amount;

          if (newQuantity > availableQuantity) {
            alert(
              `Quantidade máxima disponível para ${item.nome} é ${availableQuantity}.`
            );
            return item; // Retorna o item sem alterar a quantidade
          } else if (newQuantity < 1) {
            alert("A quantidade não pode ser menor que 1.");
            return item; // Mantém a quantidade atual se a nova quantidade for menor que 1
          } else {
            return { ...item, quantity: newQuantity }; // Atualiza a quantidade
          }
        }
        return item;
      })
    );
  };

  const getTotalValue = () => {
    return cart.reduce((total, item) => total + item.quantity * item.valor, 0);
  };

  const loginUser = (userId) => {
    setIsUserLoggedIn(true);
    setUserId(userId);
  };

  // Função para simular logout
  const logoutUser = () => {
    setIsUserLoggedIn(false);
    setUserId(null);
  };

  const finalizePurchase = async () => {
    if (!isUserLoggedIn || !userId) {
      alert("Por favor, faça login para finalizar a compra.");
      window.location.href = "/login"; // Ou use o hook useHistory() do React Router para redirecionar programaticamente
      return;
    }

    try {
      // Enviar os dados da compra para o backend
      await Axios.post(`http://localhost:3000/users/${userId}/purchase`, {
        items: cart.map((item) => ({
          productId: item._id,
          name: item.nome,
          quantity: item.quantity,
          price: item.valor,
        })),
        vendedorId: selectedSeller || userId,
      });
      
      console.log("aki foi ");

      // Atualizar o estoque para cada item no carrinho
      cart.forEach(async (item) => {
        const updatedQuantity = item.quantidade - item.quantity;
        await Axios.put(`http://localhost:3000/estoque/${item._id}`, {
          quantidade: updatedQuantity,
        });
      });

      // Limpar o carrinho após a finalização da compra
      setCart([]);
      alert("Compra finalizada com sucesso!");
    } catch (error) {
      console.error("Erro ao finalizar a compra", error);
      alert("Houve um erro ao finalizar a compra. Por favor, tente novamente.");
    }
  };

  const value = {
    listOfUsers,
    listOfStorage,
    filterCategory,
    addToCart,
    updateQuantity,
    cart,
    loginUser,
    logoutUser,
    isUserLoggedIn,
    finalizePurchase,
    getTotalValue,
    selectedSeller,
    setSelectedSeller,
    removeFromCart,
    setFilterCategory,
    //user,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
