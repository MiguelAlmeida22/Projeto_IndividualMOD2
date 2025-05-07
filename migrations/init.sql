-- Criação Tabela "Usuário"
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR (50) NOT NULL
);

-- Criação Tabela "Sala"
CREATE TABLE IF NOT EXISTS sala (
  id_sala SERIAL PRIMARY KEY,
  numero INTEGER NOT NULL, 
  localizacao varchar(100),
  capacidade INTEGER,
  disponivel BOOLEAN
);

-- Criação Tabela "Reserva"
CREATE TABLE IF NOT EXISTS reserva (
  id_reserva SERIAL PRIMARY KEY,
  id_usuario INTEGER NOT NULL,
  id_sala INTEGER NOT NULL,
  reservado_em TIMESTAMP NOT NULL,
  data_inicio TIMESTAMP NOT NULL,
  data_fim TIMESTAMP NOT NULL,
  FOREIGN KEY (id_usuario) REFERENCES usuario(id_usuario),
  FOREIGN KEY (id_sala) REFERENCES sala(id_sala)
);