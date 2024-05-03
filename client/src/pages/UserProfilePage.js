import React, { useEffect } from 'react';
import { useAuth } from '../AuthContext'; // Ajuste o caminho conforme necessário
import './UserProfilePage.css'; // Ajuste o caminho conforme necessário

const UserProfilePage = () => {
  const { user, updateUserData } = useAuth(); // Supondo que useAuth() forneça os dados do usuário
  const userId = user._id;

  useEffect(() => {
    if(userId){
       updateUserData(userId);
    }
  }, [updateUserData, userId]); // Adiciona updateUserData como dependência se ela puder mudar



  return (
    <div className="user-profile-container">
      <div className="user-profile-card">
        <h1 className="user-profile-title">Perfil do Usuário</h1>
        <div className="user-info">
            <p><strong>Nome:</strong> {user.name}</p>
            <p><strong>Idade:</strong> {user.age}</p>
            <p><strong>CPF:</strong> {user.cpf}</p>
            {user.contato.map((contato, index) => (
                <div key={index}>
                <p><strong>Telefone:</strong> {contato.telefone || 'Não informado'}</p>
                <p><strong>Endereço:</strong> {contato.endereco || 'Não informado'}</p>
                </div>
            ))}
            <p><strong>Flamengo:</strong> {user.flamengo ? 'Sim' : 'Não'}</p>
            <p><strong>One Piece:</strong> {user.one_piece ? 'Sim' : 'Não'}</p>
            <p><strong>Sousa:</strong> {user.sousa ? 'Sim' : 'Não'}</p>
            <p><strong>Vendedor:</strong> {user.vendedor ? 'Sim' : 'Não'}</p>
            <p><strong>Data de Criação:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
            <div className="purchase-history">
            <h2>Histórico de Compras</h2>
           {user.purchaseHistory && user.purchaseHistory.length > 0 ? (
              user.purchaseHistory.map((purchase, index) => (
                <div key={index} className="purchase-record">
                  <h3>Compra {index + 1}</h3>
                  <p><strong>Data da Compra:</strong> {new Date(purchase.purchaseDate).toLocaleDateString()}</p>
                  {purchase.vendedorId && <p><strong>Vendedor:</strong> {purchase.vendedorId.name}</p>} {/* Exibindo o nome do vendedor */}
                  <div>
                    <strong>Itens Comprados:</strong>
                    <ul>
                      {purchase.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {item.name} - Quantidade: {item.quantity} - Preço: {item.price}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))
            ) : (
              <p>Nenhum histórico de compra encontrado.</p>
            )}
          </div>
          {/* Adicione mais informações do usuário conforme necessário */}
        </div>
      </div>
    </div>
  );


};

export default UserProfilePage;