import { Router } from 'express';
import { getEstoque, createItem, deleteItem, updateItem, findByName, report } from '../src/controllers/EstoqueController.js';

const EstoqueRoutes = Router();

EstoqueRoutes.get('/estoque', getEstoque);
EstoqueRoutes.post('/estoque', createItem);
EstoqueRoutes.delete('/estoque/:id', deleteItem);
EstoqueRoutes.put('/estoque/:id', updateItem);
EstoqueRoutes.search('/estoque', findByName);
EstoqueRoutes.get('/estoque/report', report);

export default EstoqueRoutes;
