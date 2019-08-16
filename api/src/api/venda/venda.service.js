import ErrorHandler from '../../handlers/error.handler'
import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'
import httpStatus from 'http-status'
import { INSERT_VENDA, INSERT_VENDA_PRODUTO } from './venda.queries'

export async function realizaVenda (venda) {
	try {
        const informacaoVenda = new PreparedStatement('realiza-venda',  INSERT_VENDA, [venda.caminhoNota, venda.idUsuario, venda.dataVenda, venda.valorTotal, venda.desconto, venda.idFormaPagamento])
		    const vendaRealizada = await db.one(informacaoVenda)
        return vendaRealizada
    } catch (error) {
		throw new ErrorHandler('Erro ao efetuar a venda', httpStatus.BAD_REQUEST, true, error.code)
	}
}

export async function adicionarProdutosVenda (idVenda, idProduto, quantidadeComprada) {
	try {
		let resposta = await db.one(new PreparedStatement('realiza-venda-produto',  INSERT_VENDA_PRODUTO, [idVenda, idProduto, quantidadeComprada]))
		return resposta.adicionar_produto_venda;
  } catch (error) {
		throw new ErrorHandler('Erro ao adicionar produtos da venda', httpStatus.BAD_REQUEST, true, error.code)
	}
}