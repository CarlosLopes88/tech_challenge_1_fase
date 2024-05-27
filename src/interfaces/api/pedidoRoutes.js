const express = require('express');
const router = express.Router();
const pedidoRepository = require('../../domain/pedido/pedidoRepository');
const pedidoService = require('../../application/services/pedidoService');

// Cria um novo pedido
router.post('/', async (req, res) => {
    try {
        // Adicionar lógica de simulação de requisição ao gateway de pagamento externo
        const pagamentoId = 'pagamento-123'; // Simulação de ID de pagamento recebido do gateway externo
        req.body.pagamentoId = pagamentoId; // Atribuir o ID do pagamento ao pedido
        req.body.statusPagamento = 'Aprovado'; // Simular status de pagamento aprovado
        
        // Calcular o total e criar o pedido
        const novoPedido = await pedidoService.criarPedido(req.body);
        
        // Atualizar o status do pedido para "Em preparação"
        await pedidoRepository.updatePedidoStatus(novoPedido.pedidoId, 'Em preparação');

        res.status(201).json(novoPedido);
    } catch (error) {
        console.error('Erro ao criar novo pedido:', error);
        res.status(500).send({ message: "Erro no servidor", error: error.message });
    }
});

// Busca todos os pedidos
router.get('/', async (req, res) => {
    try {
        const pedidos = await pedidoRepository.getAllPedidos();
        if (pedidos.length === 0) {
            return res.status(404).send({ message: "Nenhum pedido encontrado." });
        }
        res.json(pedidos);
    } catch (error) {
        console.error('Erro ao buscar todos os pedidos:', error);
        res.status(500).send({ message: "Erro no servidor", error: error.message });
    }
});

// Busca um pedido específico pelo pedidoId
router.get('/:pedidoId', async (req, res) => {
    try {
        const pedido = await pedidoRepository.getPedidoByPedidoId(req.params.pedidoId);
        if (!pedido) {
            return res.status(404).send({ message: "Pedido não encontrado." });
        }
        res.status(200).json(pedido);
    } catch (error) {
        console.error('Erro ao buscar pedido por ID:', error);
        res.status(500).send({ message: "Erro no servidor", error: error.message });
    }
});

// Atualiza o status de um pedido específico
router.put('/:pedidoId/status', async (req, res) => {
    try {
        const { pedidoId } = req.params;
        const { novoStatus } = req.body;

        const pedidoAtualizado = await pedidoRepository.updatePedidoStatus(pedidoId, novoStatus);
        if (!pedidoAtualizado) {
            return res.status(404).send({ message: "Pedido não encontrado." });
        }

        res.status(200).json(pedidoAtualizado);
    } catch (error) {
        console.error('Erro ao atualizar status do pedido:', error);
        res.status(500).send({ message: "Erro no servidor", error: error.message });
    }
});

module.exports = router;
