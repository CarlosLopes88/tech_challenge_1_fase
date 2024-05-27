const express = require('express');
const bodyParser = require('body-parser');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const db = require('../../config/dbconnect');
// Importação das rotas
const clienteRoutes = require('../../interfaces/api/clienteRoutes');
const pedidoRoutes = require('../../interfaces/api/pedidoRoutes');
const produtoRoutes = require('../../interfaces/api/produtoRoutes');

const app = express();

// Middleware para analisar o corpo das requisições
app.use(bodyParser.json());

// Configurações do CORS para permitir que o frontend acesse a API
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Conexão com o banco de dados e inicialização do servidor
db.once('open', () => {
    console.log('Application Connected to MongoDB');
    const PORT = process.env.PORT || 3000;

    // Carrega o arquivo OpenAPI YAML
    const swaggerDocument = YAML.load('./docs/openapi.yaml');

    // Middleware para servir a documentação Swagger UI
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

    // Rotas da aplicação
    app.use('/api/cliente', clienteRoutes);
    app.use('/api/pedido', pedidoRoutes);
    app.use('/api/produto', produtoRoutes);

    // Inicia o servidor
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
});
