import Pagamento from '../entidades/e-pagamento.js';

class CtrlPagamento {
    async processar(req, res) {
        // Numa aplicação real, isso viria de um Webhook do Stripe/PayPal
        // Aqui vamos simular que o front mandou os dados
        const { idAssinatura, valor, idTransacao } = req.body;

        if (!idAssinatura || !valor) {
            return res.status(400).json({ erro: "Dados incompletos." });
        }

        const pagamento = new Pagamento();
        const result = await pagamento.registrarPagamento(idAssinatura, valor, idTransacao);
        res.status(result.status).json(result.desc);
    }
}

export default CtrlPagamento;