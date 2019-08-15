export const INSERT_VENDA = `
INSERT INTO venda(caminho_nota, id_usuario, data_criacao, data_venda, valor_total, desconto, id_forma_pagamento) 
VALUES ($1, $2, current_timestamp, $3, $4, $5, $6) 
RETURNING id
`
export const INSERT_VENDA_PRODUTO = `
SELECT adicionar_produto_venda($1, $2, 10)
`