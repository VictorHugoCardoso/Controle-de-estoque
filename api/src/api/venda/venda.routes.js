
import { Router } from 'express'
import { efetuaVenda } from './venda.controller'


const routes = new Router()

routes.post('/efetua/', efetuaVenda)


export default routes

