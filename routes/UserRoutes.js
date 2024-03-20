import { Router } from 'express'

import { getUsers, createUser, deleteUser, updateUser, findByName, report} from '../src/controllers/UserController.js'


const UserRoutes = Router()

UserRoutes.get('/users', getUsers)
UserRoutes.post('/users', createUser)
UserRoutes.delete('/users/:id', deleteUser)
UserRoutes.put('/users/:id', updateUser)
UserRoutes.search('/users', findByName)
UserRoutes.get('/report', report)

export default UserRoutes