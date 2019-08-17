import { realizaVenda, adicionarProdutosVenda } from '../venda/venda.service'
import { consultarProdutoPorId } from '../produto/produto.service'
import DataHandler from '../../handlers/data.handler'
import httpStatus from 'http-status'
import ErrorHandler from '../../handlers/error.handler';

export async function efetuaVenda (req, res, next) {
	try {
    let idVendaEfetuada = (await realizaVenda(req.body)).id
    let respostaAdicionaProdutoVenda
    if (idVendaEfetuada) {
      await verificaSeContemSuficienteNoEstoque(req.body.produtos)
      for (let i = 0; i < req.body.produtos.length; i++) {
        respostaAdicionaProdutoVenda = await adicionarProdutosVenda(idVendaEfetuada, req.body.produtos[i].id, req.body.produtos[i].quantidade);
        if(!respostaAdicionaProdutoVenda) throw new ErrorHandler('Erro ao realizar a venda', httpStatus.BAD_REQUEST, true)
      }
    }
    res.json(new DataHandler(httpStatus.OK, 'Venda efetuada com sucesso'))
	} catch (error) {
		next(error)
	}
}

export async function verificaSeContemSuficienteNoEstoque (vetProdutos) {
  for (let i = 0; i < vetProdutos.length; i++) {
    let produtoEmEstoque = await consultarProdutoPorId(vetProdutos[i].id);
    if (produtoEmEstoque.quantidade <= vetProdutos[i].quantidade) throw new ErrorHandler('Erro! Quantia insuficiente em estoque.', httpStatus.BAD_REQUEST, true)
  }
}