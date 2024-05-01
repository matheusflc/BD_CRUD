import { Router } from 'express';
import { criarCompra, listarCompras, buscarCompraPorId, atualizarCompra, deletarCompra } from '../src/controllers/CompraController.js';

const CompraRoutes = Router();

CompraRoutes.post('/compras', criarCompra);
CompraRoutes.get('/compras', listarCompras);
CompraRoutes.get('/compras/:id', buscarCompraPorId);
CompraRoutes.put('/compras/:id', atualizarCompra);
CompraRoutes.delete('/compras/:id', deletarCompra);

export default CompraRoutes;