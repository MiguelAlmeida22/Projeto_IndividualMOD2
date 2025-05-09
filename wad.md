# Web Application Document - Projeto Individual - Módulo 2 - Inteli


## Nome do Projeto

## Autor do projeto
**Miguel Ferreira de Siqueira Almeida**

## Sumário

1. [Introdução](#c1)  
2. [Visão Geral da Aplicação Web](#c2)  
3. [Projeto Técnico da Aplicação Web](#c3)  
4. [Desenvolvimento da Aplicação Web](#c4)  
5. [Referências](#c5)  

<br>

## <a name="c1"></a>1. Introdução (Semana 01)
Neste projeto, irei desenvolver um sistema web completo, com banco de dados, backend e frontend integrados. O objetivo é aplicar os conceitos que aprendi durante o módulo 2 do INTELI. A aplicação web desenvolvida será um sistema de reserva de salas para agendamentos, possibilitando que o usuário veja as salas disponíveis e escolha um dia e horário para fazer a reserva. O sistema contará com uma interface responsiva e mecanismos de validação de conflitos de horários, garantindo confiabilidade no processo de agendamento. A arquitetura do projeto será feita usando Node, JavaScript, CSS, HTML e um banco de dados relacional.

---

## <a name="c2"></a>2. Visão Geral da Aplicação Web

### 2.1. Personas (Semana 01 - opcional)

*Posicione aqui sua(s) Persona(s) em forma de texto markdown com imagens, ou como imagem de template preenchido. Atualize esta seção ao longo do módulo se necessário.*

### 2.2. User Stories (Semana 01 - opcional)

*Posicione aqui a lista de User Stories levantadas para o projeto. Siga o template de User Stories e utilize a referência USXX para numeração (US01, US02, US03, ...). Indique todas as User Stories mapeadas, mesmo aquelas que não forem implementadas ao longo do projeto. Não se esqueça de explicar o INVEST de 1 User Storie prioritária.*

---

## <a name="c3"></a>3. Projeto da Aplicação Web

### 3.1. Modelagem do banco de dados  (Semana 3)

### Modelo Relacional (Diagrama):
![image_mod_rel](./assets/modelo_relacional.png)

O diagrama apresentado representa três entidades principais: ```usuario, sala e reserva```. A entidade ```usuario``` contém as informações dos usuários do sistema, com os atributos **id_usuario (chave primária), nome e email**. Já a entidade ```sala``` armazena os dados das salas disponíveis para reserva, com os atributos **id_sala (chave primária), numero, localizacao, capacidade e um campo booleano disponivel**, que indica se a sala pode ou não ser reservada.

A tabela ```reserva``` é a entidade que registra os agendamentos realizados pelos usuários. Ela possui como **chave primária** o atributo **id_reserva e contém duas chaves estrangeiras: id_usuario, que referencia a tabela usuario, e id_sala, que referencia a tabela sala**. Além disso, há os campos **reservado_em**, que indica a data e hora em que a reserva foi feita, **data_inicio** e **data_fim**, que definem o período da reserva.

O relacionamento entre ```usuario``` e ```reserva``` é do tipo 1:N, o que significa que um único usuário pode efetuar várias reservas. Já o relacionamento entre ```sala``` e ```reserva``` também é do tipo 1:N, indicando que uma sala pode estar presente em várias reservas (em diferentes datas e horários). Esses relacionamentos são representados por **"EFETUA"** (um usuário efetua reservas) e **"CONTÉM"** (uma reserva contém uma sala).

Esse modelo garante que o sistema possa registrar quem fez cada reserva, qual sala foi reservada, e em quais horários, permitindo o controle de disponibilidade e evitando conflitos de agendamento.

### Modelo Físico

```
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
```

### 3.1.1 BD e Models (Semana 5)
*Descreva aqui os Models implementados no sistema web*

### 3.2. Arquitetura (Semana 5)

*Posicione aqui o diagrama de arquitetura da sua solução de aplicação web. Atualize sempre que necessário.*

**Instruções para criação do diagrama de arquitetura**  
- **Model**: A camada que lida com a lógica de negócios e interage com o banco de dados.
- **View**: A camada responsável pela interface de usuário.
- **Controller**: A camada que recebe as requisições, processa as ações e atualiza o modelo e a visualização.
  
*Adicione as setas e explicações sobre como os dados fluem entre o Model, Controller e View.*

### 3.3. Wireframes (Semana 03 - opcional)

*Posicione aqui as imagens do wireframe construído para sua solução e, opcionalmente, o link para acesso (mantenha o link sempre público para visualização).*

### 3.4. Guia de estilos (Semana 05 - opcional)

*Descreva aqui orientações gerais para o leitor sobre como utilizar os componentes do guia de estilos de sua solução.*


### 3.5. Protótipo de alta fidelidade (Semana 05 - opcional)

*Posicione aqui algumas imagens demonstrativas de seu protótipo de alta fidelidade e o link para acesso ao protótipo completo (mantenha o link sempre público para visualização).*

### 3.6. WebAPI e endpoints (Semana 05)

*Utilize um link para outra página de documentação contendo a descrição completa de cada endpoint. Ou descreva aqui cada endpoint criado para seu sistema.*  

### 3.7 Interface e Navegação (Semana 07)

*Descreva e ilustre aqui o desenvolvimento do frontend do sistema web, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

---

## <a name="c4"></a>4. Desenvolvimento da Aplicação Web (Semana 8)

### 4.1 Demonstração do Sistema Web (Semana 8)

*VIDEO: Insira o link do vídeo demonstrativo nesta seção*
*Descreva e ilustre aqui o desenvolvimento do sistema web completo, explicando brevemente o que foi entregue em termos de código e sistema. Utilize prints de tela para ilustrar.*

### 4.2 Conclusões e Trabalhos Futuros (Semana 8)

*Indique pontos fortes e pontos a melhorar de maneira geral.*
*Relacione também quaisquer outras ideias que você tenha para melhorias futuras.*



## <a name="c5"></a>5. Referências

_Incluir as principais referências de seu projeto, para que o leitor possa consultar caso ele se interessar em aprofundar._<br>

---
---