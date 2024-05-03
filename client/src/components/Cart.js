import React, { useState, useMemo } from "react";
import { useAppContext } from "../AppContext"; // Ajuste o caminho conforme necessário
import { useAuth } from "../AuthContext";
import "./Cart.css"; // Certifique-se de que o caminho está correto

const Cart = () => {
  const {
    cart,
    removeFromCart,
    getTotalValue,
    finalizePurchase,
    listOfUsers,
    selectedSeller,
    setSelectedSeller,
  } = useAppContext();
  const { user } = useAuth();

  const sellers = useMemo(
    () => listOfUsers.filter((u) => u.vendedor),
    [listOfUsers]
  );

  const handleFinalizePurchase = () => {
    if (!user?.vendedor && !selectedSeller) {
      alert("Por favor, selecione um vendedor para finalizar a compra.");
      return;
    }
    // Aqui você pode adicionar a lógica para atribuir a compra ao vendedor selecionado
    finalizePurchase();
  };

  const discountPercentage = useMemo(() => {
    let discount = 0;
    if (user?.flamengo) discount += 5;
    if (user?.one_piece) discount += 5;
    if (user?.sousa) discount += 5;
    return discount;
  }, [user]);

  const totalValueWithDiscount = useMemo(() => {
    const totalValue = getTotalValue();
    const discount = (discountPercentage / 100) * totalValue;
    return totalValue - discount;
  }, [cart, discountPercentage, getTotalValue]);

  return (
    <div className="cart-container">
      <h2 className="cart-title">Seu Carrinho</h2>
      {cart.length > 0 ? (
        <div className="cart-items">
          {cart.map((item) => (
            <div className="cart-item" key={item._id}>
              <span className="item-name">Nome: {item.nome}</span>
              <span className="item-details">
                Quantidade: {item.quantity}, Preço: R${item.valor}
              </span>
              <button
                onClick={() => removeFromCart(item._id)}
                className="remove-item-button"
              >
                Remover
              </button>
            </div>
          ))}
          <div className="cart-total">
            {discountPercentage > 0 && (
              <div>
                <strong>Desconto: {discountPercentage}%</strong>
              </div>
            )}
            <strong>Valor Total: R${totalValueWithDiscount.toFixed(2)}</strong>
          </div>
          <div>
            {!user?.vendedor && sellers.length > 0 && (
              <div>
                <label htmlFor="seller-select">Escolha um Vendedor:</label>
                <select
                  id="seller-select"
                  value={selectedSeller}
                  onChange={(e) => setSelectedSeller(e.target.value)}
                >
                  <option value="">Selecione um Vendedor</option>
                  {sellers.map((seller) => (
                    <option key={seller._id} value={seller._id}>
                      {seller.name}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
        </div>
      ) : (
        <p>O carrinho está vazio.</p>
      )}

      <button className="checkout-button" onClick={handleFinalizePurchase}>
        Finalizar Compra
      </button>
    </div>
  );
};

export default Cart;
