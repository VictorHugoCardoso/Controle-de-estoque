import { realizaVenda, adicionarProdutosVenda } from '../venda/venda.service'
import DataHandler from '../../handlers/data.handler'
import httpStatus from 'http-status'
import camelize from 'camelize'

export async function efetuaVenda (req, res, next) {
	try {
    let idVendaEfetuada = (await realizaVenda(req.body)).id
    if (idVendaEfetuada) {
      for (let i = 0; i < req.body.produtos.length; i++) {
        // await adicionarProdutosVenda(idVendaEfetuada, req.body.produtos[i].id);
      }
    }
    res.json(new DataHandler(httpStatus.OK, 'Venda efetuada com sucesso'))
	} catch (error) {
		next(error)
	}
}