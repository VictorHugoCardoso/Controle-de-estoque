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
export const CADASTRA_PRODUTO = `
INSERT INTO produto(descricao)
VALUES($1)
RETURNING id
`
export const ADICIONA_AO_ESTOQUE_MANUALMENTE = `
INSERT INTO produto_loja(id_produto, id_loja, quantidade, data_criacao, tipo_criacao, id_unidade_medida, valor_unitario)
VALUES($1, $2, $3, current_timestamp, $4, $5, $6)
RETURNING *
`
export const BUSCA_POR_NOME = `
select produto.descricao,
produto_loja.id_loja, produto_loja.id_produto, produto_loja.id_unidade_medida,
produto_loja.quantidade, produto_loja.data_criacao, produto_loja.tipo_criacao, produto_loja.valor_unitario,
unidade_medida.sigla
from produto
inner join produto_loja on produto_loja.id_produto = produto.id
inner join unidade_medida on unidade_medida.id = id_unidade_medida
where produto.descricao = $1;
`