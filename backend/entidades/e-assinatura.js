import { openDb } from '../db/configdb.js';

class Assinatura {
    async criarAssinatura(idUsuario, idPlano) {
        const db = await openDb();
        try {
            // 1. Verificar se usuário já tem assinatura
            const existente = await db.get('SELECT * FROM assinaturas WHERE id_usuario = ?', [idUsuario]);
            if (existente) {
                return { status: 409, desc: { erro: "Usuário já possui uma assinatura." } };
            }

            // 2. Buscar detalhes do plano para saber a duração
            const plano = await db.get('SELECT * FROM planos WHERE id = ?', [idPlano]);
            if (!plano) {
                return { status: 404, desc: { erro: "Plano não encontrado." } };
            }

            // 3. Calcular datas
            const dataInicio = new Date();
            const dataExpiracao = new Date();
            dataExpiracao.setDate(dataInicio.getDate() + plano.duracao_dias);

            // 4. Inserir Assinatura (Começa como 'inativa' aguardando pagamento, ou 'ativa' se preferir liberar direto)
            const statusInicial = 'inativa'; 
            const result = await db.run(
                `INSERT INTO assinaturas (id_usuario, id_plano, data_inicio, data_expiracao, status) 
                 VALUES (?, ?, ?, ?, ?)`,
                [idUsuario, idPlano, dataInicio.toISOString(), dataExpiracao.toISOString(), statusInicial]
            );

            // Opcional: Atualizar tabela de usuário para refletir o tipo
            await db.run('UPDATE usuarios SET tipo_assinatura = ? WHERE id = ?', [plano.nome, idUsuario]);

            return { status: 201, desc: { id: result.lastID, status: statusInicial } };

        } catch (error) {
            console.error("Erro ao criar assinatura:", error);
            return { status: 500, desc: { erro: "Erro interno ao processar assinatura." } };
        }
    }

    async buscarPorUsuario(idUsuario) {
        const db = await openDb();
        try {
            // Faz um JOIN para trazer os nomes bonitinhos do Plano junto
            const assinatura = await db.get(`
                SELECT a.*, p.nome as nome_plano, p.valor 
                FROM assinaturas a
                JOIN planos p ON a.id_plano = p.id
                WHERE a.id_usuario = ?
            `, [idUsuario]);

            if (!assinatura) return { status: 404, desc: { erro: "Nenhuma assinatura encontrada." } };
            
            return { status: 200, desc: assinatura };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao buscar assinatura." } };
        }
    }

    async cancelar(idUsuario) {
        const db = await openDb();
        try {
            await db.run("UPDATE assinaturas SET status = 'cancelada' WHERE id_usuario = ?", [idUsuario]);
            await db.run("UPDATE usuarios SET tipo_assinatura = 'Free' WHERE id = ?", [idUsuario]);
            return { status: 200, desc: { mensagem: "Assinatura cancelada com sucesso." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao cancelar." } };
        }
    }
}

export default Assinatura;