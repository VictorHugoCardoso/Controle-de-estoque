
import { Router } from 'express'
import { buscaTodos, buscaProdutoPorId } from './produto.controller'


const routes = new Router()

routes.get('/', buscaTodos)
routes.get('/busca/:id', buscaProdutoPorId)


export default routes

