import ErrorHandler from '../../handlers/error.handler'
import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'
import httpStatus from 'http-status'
import { BUSCA_TODOS, BUSCA_POR_ID, CADASTRA_PRODUTO, ADICIONA_AO_ESTOQUE_MANUALMENTE, BUSCA_POR_NOME } from './produto.queries'

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

export async function cadastrarProduto(produto) {
  try {
    const informacaoProduto = new PreparedStatement('cadastra-produto', CADASTRA_PRODUTO, [produto.descricao])
    const produtoCadastrado = await db.oneOrNone(informacaoProduto)
    return produtoCadastrado
  } catch (error) {
    throw new ErrorHandler('Erro ao cadastrar o produto no sistema.', httpStatus.BAD_REQUEST, true, error.code)
  }
}

export async function adicionaProdutoAoEstoqueManualmente(produto) {
  try {
    const informacaoProduto = new PreparedStatement('adiciona-produto-estoque-manualmente', ADICIONA_AO_ESTOQUE_MANUALMENTE, [produto.idProduto, produto.idLoja, produto.quantidade, 1, produto.idUnidadeMedida, produto.valorUnitario])
    const produtoCadastrado = await db.oneOrNone(informacaoProduto)
    return produtoCadastrado
  } catch (error) {
		throw new ErrorHandler('Erro ao cadastrar o produto no estoque.', httpStatus.BAD_REQUEST, true, error.code)
  }
} 
  export async function consultarProdutoPorNome (nomeProduto) {
    try {
      const informacaoProduto = new PreparedStatement('busca-produto-nome', BUSCA_POR_NOME, [nomeProduto])
      const produtoBuscado = await db.oneOrNone(informacaoProduto)
      return produtoBuscado
    } catch (error) {
      throw new ErrorHandler('Erro ao buscar o produto', httpStatus.BAD_REQUEST, true, error.code)
    }
  }
