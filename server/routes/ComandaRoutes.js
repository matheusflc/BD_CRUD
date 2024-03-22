import { Router } from 'express';
import { createComanda, getComandas, getComandaById, updateComanda, deleteComanda } from '../src/controllers/ComandaController.js';

const ComandaRoutes = Router();

ComandaRoutes.post('/comandas', createComanda);
ComandaRoutes.get('/comandas', getComandas);
ComandaRoutes.get('/comandas/:id', getComandaById);
ComandaRoutes.put('/comandas/:id', updateComanda);
ComandaRoutes.delete('/comandas/:id', deleteComanda);

export default ComandaRoutes;