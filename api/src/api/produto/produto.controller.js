import { consultarTodos, consultarProdutoPorId } from '../produto/produto.service'
import DataHandler from '../../handlers/data.handler'
import httpStatus from 'http-status'
import camelize from 'camelize'

export async function buscaTodos (req, res, next) {
	try {
		res.json(new DataHandler(httpStatus.OK, 'Produtos buscados com sucesso', camelize(await consultarTodos())))
	} catch (error) {
		next(error)
	}
}

export async function buscaProdutoPorId (req, res, next) {
	try {
		res.json(new DataHandler(httpStatus.OK, 'Produto buscado com sucesso', camelize(await consultarProdutoPorId(req.params.id))))
	} catch (error) {
		next(error)
	}
}