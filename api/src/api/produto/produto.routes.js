
import { Router } from 'express'
import { buscaTodos, buscaProdutoPorId, cadastraProdutoManualmente } from './produto.controller'


const routes = new Router()

routes.get('/', buscaTodos)
routes.get('/busca/:id', buscaProdutoPorId)

routes.post('/adicionar/manualmente/', cadastraProdutoManualmente)


export default routes

