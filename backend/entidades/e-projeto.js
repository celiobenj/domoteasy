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

    async atualizarItens(idProjeto, listaDispositivosIds) {
        const db = await openDb();
        try {
            // Remove itens antigos e insere os novos
            await db.run("DELETE FROM itens_projeto WHERE idProjeto = ?", [idProjeto]);

            if (listaDispositivosIds && listaDispositivosIds.length > 0) {
                for (const idDisp of listaDispositivosIds) {
                    await db.run("INSERT INTO itens_projeto (idProjeto, idDispositivo) VALUES (?, ?)", [idProjeto, idDisp]);
                }
            }

            return { status: 200, desc: { mensagem: "Itens atualizados com sucesso." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao atualizar itens." } };
        }
    }

    async buscarPorId(idProjeto, idUsuario) {
        const db = await openDb();
        try {
            // Busca o projeto
            const projeto = await db.get(
                "SELECT * FROM projetos WHERE id = ? AND idUsuario = ?",
                [idProjeto, idUsuario]
            );

            if (!projeto) {
                return { status: 404, desc: { erro: "Projeto não encontrado." } };
            }

            // Busca os itens do projeto com detalhes dos dispositivos
            const itens = await db.all(`
                SELECT 
                    d.id,
                    d.nome,
                    d.marca,
                    d.preco,
                    d.linkCompra,
                    m.descricao,
                    m.linkVideo,
                    ip.quantidade
                FROM itens_projeto ip
                INNER JOIN dispositivos d ON ip.idDispositivo = d.id
                LEFT JOIN manuais m ON d.id = m.idDispositivo
                WHERE ip.idProjeto = ?
            `, [idProjeto]);

            return {
                status: 200,
                desc: {
                    projeto,
                    itens
                }
            };
        } catch (error) {
            console.error('Erro ao buscar projeto:', error);
            return { status: 500, desc: { erro: "Erro ao buscar projeto." } };
        }
    }
}
export default Projeto;
