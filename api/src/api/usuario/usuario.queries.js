export const LOGIN = 'SELECT id, nome, email, data_criacao, id_loja FROM usuario WHERE email = $1 AND senha = crypt($2, "senha") LIMIT 1'