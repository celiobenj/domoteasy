import Orcamento from '../entidades/e-orcamento.js';
import Dispositivo from '../entidades/e-dispositivo.js';

class CtrlOrcamento {
    async gerar(req, res) {
        const { itens } = req.body; // Array of item IDs

        if (!itens || !Array.isArray(itens)) {
            return res.status(400).json({ desc: { erro: "Lista de itens inválida." } });
        }

        try {
            const dispositivo = new Dispositivo();
            const result = await dispositivo.listarTodos();

            let valorTotal = 0;
            if (result.status === 200 && Array.isArray(result.desc)) {
                const todosDispositivos = result.desc;
                for (const itemId of itens) {
                    const item = todosDispositivos.find(d => String(d.id) === String(itemId));
                    if (item) {
                        valorTotal += Number(item.preco || 0);
                    }
                }
            }

            res.status(200).json({ desc: { valorTotal: valorTotal } });
        } catch (error) {
            console.error(error);
            res.status(500).json({ desc: { erro: "Erro ao gerar orçamento." } });
        }
    }
}
export default CtrlOrcamento;