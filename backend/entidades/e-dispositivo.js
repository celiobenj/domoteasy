import { openDb } from '../db/configdb.js';

class Dispositivo {
    // VCP12: Admin cria dispositivo e manual
    async criarDispositivoComManual(dadosDisp, dadosManual) {
        const db = await openDb();
        try {
            const resDisp = await db.run(
                "INSERT INTO dispositivos (nome, marca, preco, linkCompra) VALUES (?, ?, ?, ?)",
                [dadosDisp.nome, dadosDisp.marca, dadosDisp.preco, dadosDisp.linkCompra]
            );
            const idDisp = resDisp.lastID;

            if (dadosManual) {
                await db.run(
                    "INSERT INTO manuais (idDispositivo, descricao, linkVideo) VALUES (?, ?, ?)",
                    [idDisp, dadosManual.descricao, dadosManual.linkVideo]
                );
            }
            return { status: 201, desc: { mensagem: "Conteúdo criado com sucesso.", id: idDisp } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao criar conteúdo." } };
        }
    }

    // SD09: Buscar manual (lógica de acesso no controller)
    async buscarManualPorDispositivo(idDispositivo) {
        const db = await openDb();
        try {
            const manual = await db.get("SELECT * FROM manuais WHERE idDispositivo = ?", [idDispositivo]);
            if (!manual) return { status: 404, desc: { erro: "Manual não encontrado." } };
            return { status: 200, desc: manual };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao buscar manual." } };
        }
    }

    async listarTodos() {
        const db = await openDb();
        const dispositivos = await db.all("SELECT * FROM dispositivos");
        return { status: 200, desc: dispositivos };
    }

    async remover(id) {
        const db = await openDb();
        try {
            // Manuais devem ser removidos se não houver ON DELETE CASCADE
            // Assumindo que pode não haver, removemos manualmente por segurança
            await db.run("DELETE FROM manuais WHERE idDispositivo = ?", [id]);
            await db.run("DELETE FROM dispositivos WHERE id = ?", [id]);
            return { status: 200, desc: { mensagem: "Dispositivo removido com sucesso." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao remover dispositivo." } };
        }
    }

    async atualizar(id, dados) {
        const db = await openDb();
        try {
            const { nome, marca, preco, linkCompra, manual } = dados;

            // Atualiza dispositivo
            // Construção dinâmica da query poderia ser melhor, mas faremos simples para os campos conhecidos
            // Se algum campo for undefined, ele não deve sobrescrever com NULL se a intenção for patch, 
            // mas como é PUT/edição completa ou parcial controlada, vamos assumir que o que vier é para atualizar.
            // Para simplificar, vamos atualizar tudo que vier.

            let queryParts = [];
            let params = [];

            if (nome !== undefined) { queryParts.push("nome = ?"); params.push(nome); }
            if (marca !== undefined) { queryParts.push("marca = ?"); params.push(marca); }
            if (preco !== undefined) { queryParts.push("preco = ?"); params.push(preco); }
            if (linkCompra !== undefined) { queryParts.push("linkCompra = ?"); params.push(linkCompra); }

            if (queryParts.length > 0) {
                params.push(id);
                await db.run(`UPDATE dispositivos SET ${queryParts.join(", ")} WHERE id = ?`, params);
            }

            // Atualiza manual se fornecido
            if (manual) {
                // Verifica se já existe manual
                const manualExistente = await db.get("SELECT id FROM manuais WHERE idDispositivo = ?", [id]);

                if (manualExistente) {
                    let mQueryParts = [];
                    let mParams = [];
                    if (manual.descricao !== undefined) { mQueryParts.push("descricao = ?"); mParams.push(manual.descricao); }
                    if (manual.linkVideo !== undefined) { mQueryParts.push("linkVideo = ?"); mParams.push(manual.linkVideo); }

                    if (mQueryParts.length > 0) {
                        mParams.push(id);
                        await db.run(`UPDATE manuais SET ${mQueryParts.join(", ")} WHERE idDispositivo = ?`, mParams);
                    }
                } else {
                    // Se não existe, cria
                    await db.run(
                        "INSERT INTO manuais (idDispositivo, descricao, linkVideo) VALUES (?, ?, ?)",
                        [id, manual.descricao || "", manual.linkVideo || ""]
                    );
                }
            }

            return { status: 200, desc: { mensagem: "Dispositivo atualizado com sucesso." } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao atualizar dispositivo." } };
        }
    }
}
export default Dispositivo;