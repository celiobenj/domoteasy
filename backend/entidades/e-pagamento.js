import { openDb } from '../db/configdb.js';

class Pagamento {
    async registrarPagamento(idAssinatura, valorPago, idTransacao) {
        const db = await openDb();
        try {
            // 1. Registrar o pagamento
            await db.run(
                `INSERT INTO pagamentos (idAssinatura, valorPago, status, idTransacaoGateway) 
                 VALUES (?, ?, 'aprovado', ?)`,
                [idAssinatura, valorPago, idTransacao]
            );

            // 2. Ativar a assinatura associada
            await db.run(
                "UPDATE assinaturas SET status = 'ativa' WHERE id = ?", 
                [idAssinatura]
            );

            return { status: 201, desc: { mensagem: "Pagamento registrado e assinatura ativada." } };

        } catch (error) {
            console.error("Erro pagamento:", error);
            return { status: 500, desc: { erro: "Erro ao registrar pagamento." } };
        }
    }
}

export default Pagamento;