import { Router } from 'express'

import { getUsers, createUser, deleteUser, updateUser, findByName, report} from './controllers/UserController.js'

const routes = Router()

routes.get('/users', getUsers)
routes.post('/users', createUser)
routes.delete('/users/:id', deleteUser)
routes.put('/users/:id', updateUser)
routes.search('/users', findByName)
routes.get('/report', report)

export default routes