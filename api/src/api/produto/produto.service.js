import ErrorHandler from '../../handlers/error.handler'
import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'
import httpStatus from 'http-status'
import { BUSCA_TODOS, BUSCA_POR_ID } from './produto.queries'

export async function consultarTodos () {
	try {
    const informacaoProduto = new PreparedStatement('busca-produto', BUSCA_TODOS)
    const produtoBuscado = await db.manyOrNone(informacaoProduto)
    return produtoBuscado
  } catch (error) {
		throw new ErrorHandler('Erro ao buscar o produto', httpStatus.BAD_REQUEST, true, error.code)
	}
}


export async function consultarProdutoPorId (idProduto) {
	try {
    const informacaoProduto = new PreparedStatement('busca-produto-id', BUSCA_POR_ID, [idProduto])
    const produtoBuscado = await db.oneOrNone(informacaoProduto)
    return produtoBuscado
  } catch (error) {
		throw new ErrorHandler('Erro ao buscar o produto', httpStatus.BAD_REQUEST, true, error.code)
	}
}