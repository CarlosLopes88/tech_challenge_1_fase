const Pedido = require('./pedido');

class PedidoRepository {
    async addPedido(pedidoData) {
        const pedido = new Pedido(pedidoData);
        await pedido.save();
        return pedido;
    }

    async getPedidoByPedidoId(pedidoId) {
        return Pedido.findOne({ pedidoId });
    }

    async getAllPedidos() {
        return Pedido.find({});
    }

    async updatePedidoStatus(pedidoId, novoStatus) {
        return Pedido.findOneAndUpdate(
            { pedidoId },
            { status: novoStatus },
            { new: true }
        );
    }
}

module.exports = new PedidoRepository();
