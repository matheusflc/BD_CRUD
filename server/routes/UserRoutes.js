import { Router } from 'express'

import { getUsers, createUser, deleteUser, updateUser, findByName, report, finalizePurchase, getUserById} from '../src/controllers/UserController.js'


const UserRoutes = Router()

UserRoutes.get('/users', getUsers)
UserRoutes.post('/users', createUser)
UserRoutes.delete('/users/:id', deleteUser)
UserRoutes.put('/users/:id', updateUser)
UserRoutes.search('/users', findByName)
UserRoutes.get('/report', report)
UserRoutes.get('/users/:id', getUserById); 

UserRoutes.post('/users/:userId/purchase', finalizePurchase);

export default UserRoutes