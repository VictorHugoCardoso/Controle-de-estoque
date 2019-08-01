import httpStatus from 'http-status'

const listaErros = {
	NAO_AUTORIZADO: {
		codigo: 'A01',
		mensagem: 'Sem autorização para acessar o recurso',
		titulo: 'Erro de autorização',
		httpStatus: httpStatus.UNAUTHORIZED
	},
	PROIBIDO: {
		codigo: 'A02',
		mensagem: 'Acesso negado',
		titulo: 'Erro de autorização',
		httpStatus: httpStatus.FORBIDDEN
	},
	PERFIL_EXISTENTE: {
		codigo: 'P01',
		mensagem: 'Já existe um perfil com este e-mail',
		titulo: 'Erro de verificação',
		httpStatus: httpStatus.BAD_REQUEST
	},
	PERFIL_INEXISTENTE: {
		codigo: 'P02',
		mensagem: 'Usuário e/ou senha inválidos',
		titulo: 'Erro de verificação',
		httpStatus: httpStatus.BAD_REQUEST
	},
	SENHA_INCORRETA: {
		codigo: 'P03',
		mensagem: 'Senha inválida',
		titulo: 'Erro de verificação',
		httpStatus: httpStatus.BAD_REQUEST
	}
}

export default listaErros
