import express from 'express';
import {
  listarClientes,
  buscarClientePorId,
  criarCliente,
  atualizarCliente,
  deletarCliente
} from '../src/controllers/ClienteController.js';

const ClienteRoutes = express.Router();

// Rota para listar todos os clientes
ClienteRoutes.get('/clientes', listarClientes);

// Rota para buscar um cliente específico por ID
ClienteRoutes.get('/clientes/:id', buscarClientePorId);

// Rota para criar um novo cliente
ClienteRoutes.post('/clientes', criarCliente);

// Rota para atualizar um cliente existente
ClienteRoutes.put('/clientes/:id', atualizarCliente);

// Rota para deletar um cliente
ClienteRoutes.delete('/clientes/:id', deletarCliente);

export default ClienteRoutes;