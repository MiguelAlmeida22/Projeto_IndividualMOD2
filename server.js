const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

// Middleware para processar JSON
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

// Rotas
const routes = require('./routes/index');
app.use('/api', routes);

// Inicializa o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});