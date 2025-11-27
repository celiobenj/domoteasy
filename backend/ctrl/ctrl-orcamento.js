import Orcamento from '../entidades/e-orcamento.js';

class CtrlOrcamento {
    async gerar(req, res) {
        const { idProjeto } = req.body;
        const orcamento = new Orcamento();
        const result = await orcamento.gerar(idProjeto);
        res.status(result.status).json(result.desc);
    }
}
export default CtrlOrcamento;