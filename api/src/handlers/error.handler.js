import httpStatus from 'http-status'

const DEFAULT_ERROR_CODE = 0

class ErrorHandler extends Error {
	constructor (mensagem, status = httpStatus.INTERNAL_SERVER_ERROR, conteudo = {}, codigoErro = DEFAULT_ERROR_CODE) {
		super(mensagem)
		this.mensagem = mensagem
		this.codigoErro = codigoErro
		this.status = status
		this.conteudo = conteudo
	}
}

export default ErrorHandler
