import { openDb } from '../db/configdb.js';

class Projeto {
    // VCP04 / SD04: Criar projeto e associar itens
    async criar(idUsuario, nome, descricao, preferencias, listaDispositivosIds) {
        const db = await openDb();
        try {
            const result = await db.run(
                "INSERT INTO projetos (idUsuario, nome, descricao, preferencias) VALUES (?, ?, ?, ?)",
                [idUsuario, nome, descricao, preferencias]
            );
            const idProjeto = result.lastID;

            if (listaDispositivosIds && listaDispositivosIds.length > 0) {
                for (const idDisp of listaDispositivosIds) {
                    await db.run("INSERT INTO itens_projeto (idProjeto, idDispositivo) VALUES (?, ?)", [idProjeto, idDisp]);
                }
            }
            return { status: 201, desc: { id: idProjeto, mensagem: "Projeto criado com sucesso." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao criar projeto." } };
        }
    }

    async listarPorUsuario(idUsuario) {
        const db = await openDb();
        try {
            const projetos = await db.all("SELECT * FROM projetos WHERE idUsuario = ?", [idUsuario]);
            return { status: 200, desc: projetos };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao listar projetos." } };
        }
    }
}
export default Projeto;