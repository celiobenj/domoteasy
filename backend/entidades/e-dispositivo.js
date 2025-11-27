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
            return { status: 201, desc: { mensagem: "Conteúdo criado com sucesso." } };
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
}
export default Dispositivo;