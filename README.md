# Projeto Individual Módulo 02 - 2025

### Descrição do Sistema:
O sistema desenvolvido será de reservas de salas e tem como objetivo gerenciar de forma eficiente a utilização de ambientes por meio de um processo de agendamento digital, possibilitando que usuários realizem reservas de salas disponíveis em horários específicos. O sistema será responsável por validar a disponibilidade e evitar conflitos de agendamento.

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
     node migrations/runSQLScript.js
     ```
   - Isso criará as tabelas `usuarios`, `salas` e `reservas`.

5. Inicie o servidor:
    - Com o banco configurado e o `.env` preenchido:
     ```bash
     npm start
     ```
   - O sistema será iniciado em `http://localhost:3000` (ou na porta especificada).


