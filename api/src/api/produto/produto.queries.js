export const BUSCA_TODOS = 'SELECT id, descricao FROM produto'
export const BUSCA_POR_ID = `
select produto.descricao,
produto_loja.id_loja, produto_loja.id_produto, produto_loja.id_unidade_medida,
produto_loja.quantidade, produto_loja.data_criacao, produto_loja.tipo_criacao, produto_loja.valor_unitario,
unidade_medida.sigla
from produto
inner join produto_loja on produto_loja.id_produto = produto.id
inner join unidade_medida on unidade_medida.id = id_unidade_medida
where produto.id = $1;
`
