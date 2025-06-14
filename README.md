# Projeto Individual Módulo 02 - 2025

# Nome do Projeto: Easy Room

### Descrição do Sistema:
O sistema desenvolvido será de reservas de salas e tem como objetivo gerenciar de forma eficiente a utilização de ambientes por meio de um processo de agendamento digital, possibilitando que usuários realizem reservas de salas disponíveis em horários específicos. O sistema será responsável por validar a disponibilidade e evitar conflitos de agendamento.

### Funcionalidades:
O sistema contará com cinco páginas principais, a "Tela Inicial" que terá botões que levará para as seguintes outras páginas: "Salas Disponíveis" onde o usuário poderá ver todas as salas que podem ser reservadas e suas informações, "Fazer Reserva" onde o usuário deverá fornecer seu nome e um email, apois isso virá a "Página de Reserva" onde poderá escolher uma sala, o dia e o horário da reserva, após isso terá a tela de "Minhas Reservas" onde o usuário deverá fornecer o mesmo nome e email fornecido anteriormente para consultar todas suas reservas.

A aplicação também contará com uma opção de "Modo Escuro" que deixará a interface preta e adaptará as cores de botões, cards, etc. Com o objetivo de aumentar o conforto para usuários que preferem um ambiente com menos claridade.

### Estrutura de Pastas:
 ```
 PROJETO_INDIVIDUALMOD2
├── 📁 assets
│   └── modelo_relacional.png
├── 📁 config
│   └── database.js
├── 📁 controllers
│   └── HomeController.js
├── 📁 migrations
│   ├── init.sql
│   └── runSQLScript.js
├── 📁 models
│   └── User.js
├── 📁 node_modules
├── 📁 routes
│   └── index.js
├── 📁 scripts
│   └── .gitkeep
├── 📁 services
│   └── userService.js
├── 📁 styles
│   └── .gitkeep
├── 📁 tests
│   └── example.test.js
├── .env
├── .env.example
├── .gitignore
├── jest.config.js
├── package-lock.json
├── package.json
├── readme.md
├── rest.http
├── server.js
└── wad.md
``` 

### Como executar o projeto localmente:

- Pré-requisitos

    - [Node.js](https://nodejs.org/) instalado (versão recomendada: 18.x ou superior).
    - [PostgreSQL](https://www.postgresql.org/) instalado e em execução.
    - Git instalado.

1. Clone o repositório:
    - Abra o terminal e execute:
    ```bash
     git clone https://github.com/MiguelAlmeida22/Projeto_IndividualMOD2.git
     cd Projeto_IndividualMOD2
     ```

2. Instale as dependências do projeto:
     - Certifique-se de que o Node.js está instalado.
     - Execute o comando:
     ```bash
     npm install
     ```

3. Configure o ambiente:
     - Copie o arquivo de exemplo de variáveis de ambiente:
     ```bash
     cp .env.example .env
     ```
     - Edite o `.env` com as informações corretas do Supabase (banco de dados, porta, etc.).

4. Configure o banco de dados:
    - Certifique-se que o PostgreSQL está configurado e rodando e depois execute esse comando:
     ```bash
     npm run database
     ```
   - Isso criará as tabelas `usuarios`, `salas` e `reservas` e irá preenchê-las com dados de exemplo.

5. Inicie o servidor:
    - Com o banco configurado e o `.env` preenchido:
     ```bash
     npm start
     ```
   - O sistema será iniciado em `http://localhost:3000` (ou na porta especificada).
---
### Link para o vídeo de demonstração do sistema:

- **Link:** https://youtu.be/60K3WATHEos
---

### Tecnologias utilizadas:

- JavaScript
- HTML 5 
- Bootstrap
- CSS
- Node.js
- PostgreSQL
- SQL
- EJS
- Express
- Joi




