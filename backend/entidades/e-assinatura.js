import { openDb } from '../db/configdb.js';

class Assinatura {
    async criarAssinatura(idUsuario, idPlano) {
        const db = await openDb();
        try {
            // 1. Verificar se usuário já tem assinatura
            const existente = await db.get('SELECT * FROM assinaturas WHERE idUsuario = ?', [idUsuario]);
            if (existente) {
                return { status: 409, desc: { erro: "Usuário já possui uma assinatura." } };
            }

            // 2. Buscar detalhes do plano para saber a duração
            const plano = await db.get('SELECT * FROM planos WHERE id = ?', [idPlano]);
            
            // LOG DE DEBUG: Verificar se achou o plano
            if (!plano) {
                console.error("DEBUG: Plano não encontrado no DB para ID:", idPlano);
                return { status: 404, desc: { erro: "Plano não encontrado." } };
            }

            // 3. Calcular datas
            const dataInicio = new Date();
            const dataExpiracao = new Date();
            
            // LOG DE DEBUG: Verificar se duracao_dias existe
            if (!plano.duracao_dias) {
                console.error("DEBUG: Campo duracaoDias inválido ou inexistente:", plano);
                throw new Error("Configuração do plano inválida (sem duração).");
            }

            dataExpiracao.setDate(dataInicio.getDate() + plano.duracao_dias);

            // 4. Inserir Assinatura
            const statusInicial = 'inativa'; 
            const result = await db.run(
                `INSERT INTO assinaturas (idUsuario, idPlano, dataInicio, dataExpiracao, status) 
                 VALUES (?, ?, ?, ?, ?)`,
                [idUsuario, idPlano, dataInicio.toISOString(), dataExpiracao.toISOString(), statusInicial]
            );

            // Opcional: Atualizar tabela de usuário
            await db.run('UPDATE usuarios SET tipoAssinatura = ? WHERE id = ?', [plano.nome, idUsuario]);

            return { status: 201, desc: { id: result.lastID, status: statusInicial } };

        } catch (error) {
            // AQUI ESTÁ A MUDANÇA IMPORTANTE:
            console.error("🔴 ERRO CRÍTICO AO CRIAR ASSINATURA:");
            console.error(error); // Isso vai imprimir o erro completo do SQLite no terminal
            return { status: 500, desc: { erro: "Erro interno ao processar assinatura." } };
        }
    }

    async buscarPorUsuario(idUsuario) {
        const db = await openDb();
        try {
            // Faz um JOIN para trazer os nomes bonitinhos do Plano junto
            const assinatura = await db.get(`
                SELECT a.*, p.nome as nomePlano, p.valor 
                FROM assinaturas a
                JOIN planos p ON a.idPlano = p.id
                WHERE a.idUsuario = ?
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
            await db.run("UPDATE assinaturas SET status = 'cancelada' WHERE idUsuario = ?", [idUsuario]);
            await db.run("UPDATE usuarios SET tipoAssinatura = 'Free' WHERE id = ?", [idUsuario]);
            return { status: 200, desc: { mensagem: "Assinatura cancelada com sucesso." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao cancelar." } };
        }
    }
}

export default Assinatura;