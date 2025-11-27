import { openDb } from '../db/configdb.js';

class Tecnico {
    // VCP06: Buscar profissionais ativos para o usuário comum
    async buscarTecnicosAtivos() {
        const db = await openDb();
        try {
            const tecnicos = await db.all("SELECT id, nome, especialidade, email, telefone FROM tecnicos WHERE status = 'ativo'");
            return { status: 200, desc: tecnicos };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao buscar técnicos." } };
        }
    }

    async buscarPorEmail(email) {
        const db = await openDb();
        try {
            const tecnico = await db.get("SELECT * FROM tecnicos WHERE email = ?", [email]);
            if (!tecnico) return { status: 404, desc: { erro: "Técnico não encontrado." } };
            return { status: 200, desc: tecnico };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao buscar técnico." } };
        }
    }

    // SD06 e SD10: Buscar dados detalhados de um técnico
    async buscarPorId(id) {
        const db = await openDb();
        try {
            const tecnico = await db.get("SELECT * FROM tecnicos WHERE id = ?", [id]);
            if (!tecnico) return { status: 404, desc: { erro: "Técnico não encontrado." } };
            return { status: 200, desc: tecnico };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao buscar técnico." } };
        }
    }

    // VCP13: Admin gerencia status (Aprovar, Reprovar, Desativar)
    async atualizarStatus(id, novoStatus) {
        const db = await openDb();
        try {
            await db.run("UPDATE tecnicos SET status = ? WHERE id = ?", [novoStatus, id]);
            return { status: 200, desc: { mensagem: `Status do técnico alterado para ${novoStatus}.` } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao atualizar status." } };
        }
    }

    // VCP10: Técnico atualiza seus próprios dados
    async atualizarDadosContato(id, dados) {
        const db = await openDb();
        try {
            const { nome, telefone, especialidade } = dados;
            await db.run(
                "UPDATE tecnicos SET nome = ?, telefone = ?, especialidade = ? WHERE id = ?",
                [nome, telefone, especialidade, id]
            );
            return { status: 200, desc: { mensagem: "Dados atualizados." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao atualizar dados." } };
        }
    }

    // Cadastro inicial (Solicitação)
    async criar(nome, email, telefone, especialidade) {
        const db = await openDb();
        try {
            await db.run(
                "INSERT INTO tecnicos (nome, email, telefone, especialidade, status) VALUES (?, ?, ?, ?, 'pendente')",
                [nome, email, telefone, especialidade]
            );
            return { status: 201, desc: { mensagem: "Solicitação de cadastro enviada." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao cadastrar técnico." } };
        }
    }
}
export default Tecnico;