import Pagamento from '../entidades/e-pagamento.js';
import Assinatura from '../entidades/e-assinatura.js';
import Usuario from '../entidades/e-usuario.js';

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

    // NOVO: Endpoint de pagamento simulado para DEMO/TESTE
    async simularPagamento(req, res) {
        const idUsuario = req.usuario.id;
        const { idPlano } = req.body;

        if (!idPlano) {
            return res.status(400).json({ erro: "ID do plano é obrigatório." });
        }

        try {
            // 1. Criar ou atualizar a assinatura
            const assinatura = new Assinatura();
            const resultAssinatura = await assinatura.criarAssinatura(idUsuario, idPlano);

            if (resultAssinatura.status !== 201) {
                // Se já existe, buscar a assinatura existente
                const existente = await assinatura.buscarPorUsuario(idUsuario);
                if (existente.status === 200) {
                    // Usar a assinatura existente
                    const idAssinatura = existente.desc.id;

                    // Simula pagamento aprovado automaticamente
                    const pagamento = new Pagamento();
                    const idTransacaoSimulada = `SIM-${Date.now()}`;
                    const valorSimulado = existente.desc.valor || 59.90;

                    await pagamento.registrarPagamento(idAssinatura, valorSimulado, idTransacaoSimulada);

                    return res.status(200).json({
                        mensagem: "Pagamento simulado aprovado com sucesso! ✅",
                        tipo: "Assinatura existente atualizada"
                    });
                }

                return res.status(resultAssinatura.status).json(resultAssinatura.desc);
            }

            const idAssinatura = resultAssinatura.desc.id;

            // 2. Simula pagamento aprovado automaticamente
            const pagamento = new Pagamento();
            const idTransacaoSimulada = `SIM-${Date.now()}`;
            const valorSimulado = 59.90; // Valor padrão para simulação

            const resultPagamento = await pagamento.registrarPagamento(
                idAssinatura,
                valorSimulado,
                idTransacaoSimulada
            );

            if (resultPagamento.status !== 201) {
                return res.status(resultPagamento.status).json(resultPagamento.desc);
            }

            // 3. Retorna sucesso
            res.status(200).json({
                mensagem: "Pagamento simulado aprovado com sucesso! ✅",
                idAssinatura,
                idTransacao: idTransacaoSimulada
            });

        } catch (error) {
            console.error("Erro no pagamento simulado:", error);
            res.status(500).json({ erro: "Erro ao processar pagamento simulado." });
        }
    }
}

export default CtrlPagamento;