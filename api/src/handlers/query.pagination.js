class DataPaginated {
	constructor (atual = 1, total = 0, limite = 15, conteudo = []) {
		this.atual = atual
		this.limite = limite
		this.total = total
		this.conteudo = conteudo
	}
}

export default DataPaginated
