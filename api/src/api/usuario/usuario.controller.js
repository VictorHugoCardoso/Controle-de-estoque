import { logar } from '../usuario/usuario.service'
import DataHandler from '../../handlers/data.handler'
import httpStatus from 'http-status'
import camelize from 'camelize'

export async function efetuaLogin (req, res, next) {
	try {
		console.log("entrou")
		res.json(new DataHandler(httpStatus.OK, 'Usuário logado com sucesso', camelize(await logar(req.body))))
	} catch (error) {
		next(error)
	}
}