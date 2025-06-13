-- Criação Tabela "Usuário"
CREATE TABLE IF NOT EXISTS usuario (
  id_usuario SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR (50) NOT NULL
);

-- Dados de exemplo: Usuário
INSERT INTO usuario (nome, email) VALUES
('Enzo Silva', 'enzo@exemplo.com'),
('Mariana Castro', 'mariana@exemplo.com');


-- Criação Tabela "Sala"
CREATE TABLE IF NOT EXISTS sala (
  id_sala SERIAL PRIMARY KEY,
  numero INTEGER NOT NULL, 
  localizacao varchar(100),
  capacidade INTEGER,
  disponivel BOOLEAN
);

-- Dados de exemplo: Sala
INSERT INTO sala (numero, localizacao, capacidade, disponivel) VALUES
(101, 'Bloco A - Térreo', 20, TRUE),
(202, 'Bloco B - 2º Andar', 15, TRUE);


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

-- Dados de exemplo: Reserva
INSERT INTO reserva (id_usuario, id_sala, reservado_em, data_inicio, data_fim) VALUES
(1, 1, CURRENT_TIMESTAMP, '2025-06-14 09:00:00', '2025-06-14 10:00:00'),
(2, 2, CURRENT_TIMESTAMP, '2025-06-14 14:00:00', '2025-06-14 15:30:00');
