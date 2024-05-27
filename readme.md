# Order System API

## Objetivo

Este projeto tem como objetivo criar um sistema de controle de pedidos para uma lanchonete que está em expansão. Com esse sistema, a lanchonete pode gerenciar pedidos de maneira eficiente, garantindo que os clientes recebam seus pedidos corretamente e em tempo hábil.

## Funcionalidades

- **Gerenciamento de Clientes**:
  - Registrar e atualizar informações dos clientes.
  - Buscar informações de clientes por ID ou CPF.

- **Gerenciamento de Produtos**:
  - Adicionar, atualizar e excluir produtos.
  - Buscar produtos por ID e categoria.

- **Gerenciamento de Pedidos**:
  - Criar novos pedidos.
  - Acompanhar o status dos pedidos (Recebido, Em preparação, Pronto, Finalizado).
  - Atualizar o status dos pedidos.
  - Processar pagamentos e associar ao pedido.

- **Acompanhamento de Pedidos**:
  - Monitorar o progresso dos pedidos em tempo real.

## Tecnologias e Frameworks Utilizados

- **Node.js**: Ambiente de execução para o JavaScript no servidor.
- **Express**: Framework web para Node.js.
- **MongoDB**: Banco de dados NoSQL.
- **Mongoose**: Biblioteca para modelar dados no MongoDB.
- **Swagger UI**: Documentação interativa da API.
- **Docker**: Plataforma para criar e gerenciar contêineres.

## Preparar o Ambiente

### Pré-requisitos

- **Docker**: Certifique-se de ter o Docker instalado em sua máquina.
- **Node.js**: Se desejar executar a aplicação fora do Docker.

### Passos para Rodar a Aplicação

1. **Clone o Repositório**:

    ```sh
    git clone https://github.com/seu-usuario/order_system.git
    cd order_system
    ```

2. **Configurar as Variáveis de Ambiente**:

    Crie um arquivo `.env` na raiz do projeto e adicione as seguintes variáveis:

    ```env
    MONGO_USERNAME=admin
    MONGO_PASSWORD=password
    MONGO_HOST=mongodb
    MONGO_PORT=27017
    MONGO_DATABASE=order_system
    ```

3. **Subir os Contêineres com Docker Compose**:

    ```sh
    docker-compose up --build
    ```

4. **Acessar a Documentação da API**:

    Abra seu navegador e vá para `http://localhost:3000/api-docs` para visualizar e interagir com a documentação da API.

## Estrutura de Pastas

```plaintext
/order_system
|-- /docs
|    `-- openapi.yaml
|-- /src
|       |-- /application
|       |
|       |-- /config
|       |   `-- dbconnect.js
|       |-- /domain
|       |   |-- /cliente
|       |   |   |-- cliente.js
|       |   |   `-- clienteRepository.js
|       |   |-- /pagamento
|       |   |   |-- pagamento.js
|       |   |-- /pedido
|       |   |   |-- pedido.js
|       |   |   `-- pedidoRepository.js
|       |   |-- /produto
|       |       |-- produto.js
|       |       `-- produtoRepository.js
|       |-- /infrastructure
|       |   `-- /web
|       |       `-- server.js
|       |-- /interfaces
|           `-- /api
|               |-- clienteRoutes.js
|               |-- pagamentoRoutes.js
|               |-- pedidoRoutes.js
|               `-- produtoRoutes.js
|
|-- /test
|-- .env
|-- docker-compose.yaml
|-- dockerfile
|-- package-lock.json
|-- package.json
`-- .gitignore
