import { openDb } from '../db/configdb.js';

class Plano {
    async listarTodos() {
        const db = await openDb();
        try {
            const planos = await db.all('SELECT * FROM planos');
            return { status: 200, desc: planos };
        } catch (error) {
            console.error("Erro ao listar planos:", error);
            return { status: 500, desc: { erro: "Erro ao buscar planos." } };
        }
    }

    async buscarPorId(id) {
        const db = await openDb();
        try {
            const plano = await db.get('SELECT * FROM planos WHERE id = ?', [id]);
            if (!plano) return { status: 404, desc: { erro: "Plano não encontrado." } };
            return { status: 200, desc: plano };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao buscar plano." } };
        }
    }

    // Método opcional para popular o banco inicialmente (seed)
    async criar(nome, valor, descricao, duracaoDias) {
        const db = await openDb();
        try {
            await db.run(
                'INSERT INTO planos (nome, valor, descricao, duracaoDias) VALUES (?, ?, ?, ?)',
                [nome, valor, descricao, duracaoDias]
            );
            return { status: 201, desc: { mensagem: "Plano criado com sucesso." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao criar plano." } };
        }
    }
}

export default Plano;