const Produto = require('../../domain/produto/produto');
const Pedido = require('../../domain/pedido/pedido');

class PedidoService {
    async calcularTotal(pedidoData) {
        let total = 0;
        for (const item of pedidoData.produtos) {
            const produto = await Produto.findOne({ produtoId: item.produto });
            if (produto) {
                total += item.quantidade * produto.precoProduto;
            } else {
                throw new Error('Produto não encontrado');
            }
        }
        pedidoData.total = total;
        return pedidoData;
    }

    async criarPedido(pedidoData) {
        const pedidoCalculado = await this.calcularTotal(pedidoData);
        const pedido = new Pedido(pedidoCalculado);
        await pedido.save();
        return pedido;
    }
}

module.exports = new PedidoService();
