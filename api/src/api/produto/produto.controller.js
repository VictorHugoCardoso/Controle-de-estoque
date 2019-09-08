import { consultarTodos, consultarProdutoPorId, adicionaProdutoAoEstoqueManualmente, cadastrarProduto, consultarProdutoPorNome } from '../produto/produto.service'
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

export async function cadastraProdutoManualmente (req, res, next) {
	try {
		let produtos = req.body.produtos
		for (let i = 0; i < produtos.length; i++) {
			let idProdutoCadastrado
			let produtoBuscado = await consultarProdutoPorNome(produtos[i].descricao)
			if (produtoBuscado) idProdutoCadastrado = produtoBuscado.id_produto
			else idProdutoCadastrado = (await cadastrarProduto(produtos[i])).id; 
			produtos[i].idProduto = idProdutoCadastrado
			await adicionaProdutoAoEstoqueManualmente(produtos[i])
		}

		res.json(new DataHandler(httpStatus.OK, 'Produtos adicionados com sucesso',))
	} catch (error) {
		next(error)
	}
}