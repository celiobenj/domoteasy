import Plano from '../entidades/e-plano.js';

class CtrlPlano {
    async listar(req, res) {
        const plano = new Plano();
        const result = await plano.listarTodos();
        res.status(result.status).json(result.desc);
    }

    async criar(req, res) {
        // Idealmente, rota protegida apenas para admin
        const { nome, valor, descricao, duracaoDias } = req.body;
        const plano = new Plano();
        const result = await plano.criar(nome, valor, descricao, duracaoDias);
        res.status(result.status).json(result.desc);
    }
}

export default CtrlPlano;