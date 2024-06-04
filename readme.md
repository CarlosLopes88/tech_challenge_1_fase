# Order System API

## Objetivo

Este projeto tem como objetivo criar um sistema de controle de pedidos para uma lanchonete que está em expansão. Com esse sistema, a lanchonete pode gerenciar pedidos de maneira eficiente, garantindo que os clientes recebam seus pedidos corretamente e em tempo hábil. 

A proposta e construir um app para o controle dos pedidos onde utilizaremos a arquitetura hexagonal como base para seu desenvolvimento.

Dentro desse case foi desenvolvido uma analise utilizando as técnicaas de domain drive design (DDD) para entender dominios e subdominios encontrados no case, realizado também um event storming para desenho do que seria feito dentro da aplicação, além de desenvolver os grafos de agregados e contextos delimitados que estão disponiveis para consulta no link abaixo:

### [Link Miro Tech Chalenge DDD](https://miro.com/app/board/uXjVKR4zMmM=/)

Foi desenvolvido um sistema de pedidos 

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
    git clone https://github.com/seu-usuario/tech_challenge_1_fase.git
    cd tech_challenge_1_fase
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

## Ports e Adapters Detalhados:

## Driver Ports (Entradas)
As rotas de API no Express representam os Driver Ports:  

Cliente API: /api/cliente  
Pedido API: /api/pedido  
Produto API: /api/produto  
Pagamento API: /api/pagamento  

## Driven Ports (Saídas)
Os repositórios e serviços externos representam os Driven Ports:  

Repositórios:  
Cliente: clienteRepository.js  
Pedido: pedidoRepository.js  
Produto: produtoRepository.js  
Pagamento: pagamentoRepository.js  

Serviço de Pagamento:  
Implementação para integração com o Mercado Pago.  

## Driver Adapters (Adaptadores de Entrada)
Os controladores da API REST (Rotas do Express):

clienteRoutes.js  
pedidoRoutes.js  
produtoRoutes.js  
pagamentoRoutes.js  

## Driven Adapters (Adaptadores de Saída)  
Os repositórios implementados com Mongoose e a integração com o serviço de pagamento:  

Repositórios:  

clienteRepository.js  
pedidoRepository.js  
produtoRepository.js  
pagamentoRepository.js  

Serviço de Pagamento:  
Integração simulada no código para o Mercado Pago (atualizar para integração real conforme necessidade).  

## Casos de Uso

## Criar Pedido:  

Driver Port: POST /api/pedido  
Use Case: Validação do pedido, cálculo do total, criação do pedido, envio para cozinha.  
Driven Port: pedidoRepository.js, integração com serviço de pagamento.  

## Atualizar Status do Pedido:  

Driver Port: PUT /api/pedido/{pedidoId}/status  
Use Case: Atualização do status do pedido.  
Driven Port: pedidoRepository.js  

## Registrar Cliente:  

Driver Port: POST /api/cliente  
Use Case: Validação e registro do cliente.  
Driven Port: clienteRepository.js  

## Gerenciar Produtos:  

Driver Port: POST, PUT, DELETE /api/produto  
Use Case: Adicionar, atualizar e excluir produtos.  
Driven Port: produtoRepository.js  

## Processar Pagamento:  

Driver Port: POST /api/pagamento  
Use Case: Processar o pagamento via QRCode do Mercado Pago.  
Driven Port: Integração com o Mercado Pago.  

## Estrutura de Pastas  

```plaintext
/order_system
|-- /docs
|    `-- openapi.yaml
|-- /src
|   |-- /application
|       |-- /services
|           `-- pedidoService.js
|   |-- /config
|   |   `-- dbconnect.js
|   |-- /domain
|   |   |-- /cliente
|   |   |   |-- cliente.js
|   |   |   `-- clienteRepository.js
|   |   |-- /pagamento
|   |   |   |-- pagamento.js
|   |   |-- /pedido
|   |   |   |-- pedido.js
|   |   |   `-- pedidoRepository.js
|   |   |-- /produto
|   |       |-- produto.js
|   |       `-- produtoRepository.js
|   |-- /infrastructure
|   |   `-- /web
|   |       `-- server.js
|   |-- /interfaces
|       `-- /api
|           |-- clienteRoutes.js
|           |-- pagamentoRoutes.js
|           |-- pedidoRoutes.js
|           `-- produtoRoutes.js
|
|-- /test
|-- .env
|-- docker-compose.yaml
|-- dockerfile
|-- package-lock.json
|-- package.json
|-- readme.md
`-- .gitignore
