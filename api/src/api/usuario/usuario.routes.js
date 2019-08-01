
import { Router } from 'express'
import { efetuaLogin } from './usuario.controller'


const routes = new Router()

routes.post('/logar/', efetuaLogin)


export default routes

