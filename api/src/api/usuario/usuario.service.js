import ErrorHandler from '../../handlers/error.handler'
import db from '../../db/db'
import { PreparedStatement } from 'pg-promise'
import httpStatus from 'http-status'
import { LOGIN } from './usuario.queries'

export async function logar (usuario) {
	try {
        const informacaoUsuario = new PreparedStatement('logar-usuario',  LOGIN, [usuario.email, usuario.senha])
		    const usuarioBuscado = await db.one(informacaoUsuario)
        return usuarioBuscado
    } catch (error) {
		throw new ErrorHandler('Erro ao logar o usuario', httpStatus.BAD_REQUEST, true, error.code)
	}
}