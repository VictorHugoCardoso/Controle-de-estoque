create extension if not exists "pgcrypto";
alter extension pgcrypto set schema public;


CREATE TABLE loja(
  id SERIAL NOT null,
  descricao VARCHAR(255) NOT NULL,
  data_criacao timestamp not NULL,
  PRIMARY KEY (id)
);
 
insert into loja(descricao, data_criacao) values ('Loja 1', current_date);


CREATE table usuario(
  id SERIAL not NULL,
  nome VARCHAR(255) not NULL,
  email VARCHAR(255) not NULL,
  senha VARCHAR(255) not NULL,
  data_criacao timestamp not NULL,
  id_loja SERIAL not null references loja(id),
  PRIMARY KEY (id)
);

insert into usuario(nome, email, senha, data_criacao, id_loja) values ('Paulo Weber', 'paulloweber@gmail.com', crypt('senha','senha'), current_date, 1);

CREATE TABLE produto(
  id SERIAL NOT null,
  descricao VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

insert into produto(descricao) values ('BARROCO MULTICOLOR 4/6 (400g) - COR 9368');
insert into produto(descricao) values ('AGULHA CROCHE PONTA DOUR. LD-012 C/10un 3,5mm');
insert into produto(descricao) values ('EUROROMA COLORIDO 4/4 - 600 G - 915 M / BRANCO');
insert into produto(descricao) values ('EUROROMA COLORIDO 4/4 - 600 G - 915 M / PINK');
insert into produto(descricao) values ('EUROROMA COLORIDO 4/6 - 600 G - 610 M. / VERMELHO');


CREATE TABLE unidade_medida(
  id SERIAL NOT null,
  descricao VARCHAR(255) NOT NULL,
  sigla VARCHAR(10) NOT NULL,
  PRIMARY KEY (id)
);

insert into unidade_medida(descricao, sigla) values ('Quilo', 'KG');
insert into unidade_medida(descricao, sigla) values ('Metro', 'M');
insert into unidade_medida(descricao, sigla) values ('Grama', 'g');

CREATE table produto_loja(
  id_loja SERIAL not null references loja(id),  
  id_produto SERIAL not null references produto(id),  
  id_unidade_medida SERIAL not null references unidade_medida(id),
  quantidade FLOAT not null,
  data_criacao timestamp not NULL,
  valor_unitario float not null,
  tipo_criacao integer not null
);

insert into produto_loja(id_loja, id_produto, id_unidade_medida, quantidade, data_criacao, tipo_criacao, valor_unitario) VALUES(1, 1, 2, 15, current_date, 1, 140.00);
insert into produto_loja(id_loja, id_produto, id_unidade_medida, quantidade, data_criacao, tipo_criacao, valor_unitario) VALUES(1, 2, 2, 20, current_date, 1, 220.00);
insert into produto_loja(id_loja, id_produto, id_unidade_medida, quantidade, data_criacao, tipo_criacao, valor_unitario) VALUES(1, 3, 1, 1, current_date, 1, 10.0);


CREATE TABLE forma_pagamento(
  id SERIAL NOT null,
  descricao VARCHAR(255) NOT NULL,
  PRIMARY KEY (id)
);

insert into forma_pagamento(descricao) values ('Dinheiro');
insert into forma_pagamento(descricao) values ('Cr�dito');

CREATE TABLE venda(
  id SERIAL NOT null,
  caminho_nota VARCHAR(255) NOT NULL,
  data_criacao timestamp not NULL,
  id_usuario SERIAL not null references usuario(id),
  data_venda timestamp not NULL,  
  valor_total float not NULL,
  desconto float not NULL,
  id_forma_pagamento SERIAL not null references forma_pagamento(id),
  PRIMARY KEY (id)
);

CREATE table venda_produto(
  id_venda SERIAL not null references venda(id),  
  id_produto SERIAL not null references produto(id)
);


CREATE OR REPLACE FUNCTION public.adicionar_produto_venda(codigo_venda int, codigo_produto int, quantidade_comprada float) returns boolean
AS $$ 	
	declare 
		quantidade_em_estoque float := (select quantidade from produto_loja where id_produto = codigo_produto);
	begin
		if quantidade_em_estoque >= quantidade_comprada then 
			update produto_loja SET quantidade = quantidade - quantidade_comprada where id_produto = codigo_produto;
			quantidade_em_estoque := (select quantidade from produto_loja where id_produto = codigo_produto);
 			insert into venda_produto(id_venda, id_produto) VALUES(codigo_venda, codigo_produto);
			return true;
		else
			delete from venda_produto where id_venda = codigo_venda;
 			delete from venda where id = codigo_venda;
 			return false;
		end if;
	end
 $$
	LANGUAGE plpgsql;

