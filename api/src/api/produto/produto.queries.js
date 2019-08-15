export const BUSCA_TODOS = 'SELECT id, descricao FROM produto'
export const BUSCA_POR_ID = `
select id_produto, id_loja, quantidade, valor_unitario, unidade_medida.sigla
from produto_loja
inner join unidade_medida on unidade_medida.id = id_unidade_medida
where id_produto = $1
`