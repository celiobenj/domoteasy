import { openDb } from '../db/configdb.js';

class Orcamento {
    // VCP05 / SD05: Gerar orçamento baseado nos itens do projeto
    async gerar(idProjeto) {
        const db = await openDb();
        try {
            const itens = await db.all(`
                SELECT d.preco 
                FROM itens_projeto ip
                JOIN dispositivos d ON ip.idDispositivo = d.id
                WHERE ip.idProjeto = ?
            `, [idProjeto]);

            if (itens.length === 0) {
                return { status: 400, desc: { erro: "Projeto sem itens para orçar." } };
            }

            const valorTotal = itens.reduce((acc, item) => acc + item.preco, 0);

            const result = await db.run(
                "INSERT INTO orcamentos (idProjeto, valorTotal) VALUES (?, ?)",
                [idProjeto, valorTotal]
            );

            return { status: 201, desc: { id: result.lastID, valorTotal: valorTotal, idProjeto: idProjeto } };
        } catch (error) {
            return { status: 500, desc: { erro: "Erro ao gerar orçamento." } };
        }
    }
}
export default Orcamento;