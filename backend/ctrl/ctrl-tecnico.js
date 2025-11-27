import Tecnico from '../entidades/e-tecnico.js';

class CtrlTecnico {
    // Lista técnicos ativos para usuários comuns
    async listar(req, res) {
        const tecnico = new Tecnico();
        const result = await tecnico.buscarTecnicosAtivos();
        res.status(result.status).json(result.desc);
    }

    // Detalhes do técnico (SD06)
    async obterPorId(req, res) {
        const { id } = req.params;
        const tecnico = new Tecnico();
        const result = await tecnico.buscarPorId(id);
        res.status(result.status).json(result.desc);
    }

    async obterPorEmail(req, res) {
        const { email } = req.params;

        const tecnico = new Tecnico();
        const result = await tecnico.buscarPorEmail(email);
        res.status(result.status).json(result.desc);
    }

    // Cadastro de novo técnico
    async cadastro(req, res) {
        const { nome, email, telefone, especialidade } = req.body;
        const tecnico = new Tecnico();
        const result = await tecnico.criar(nome, email, telefone, especialidade);
        res.status(result.status).json(result.desc);
    }

    async atualizarPerfil(req, res) {
        const id = req.usuario.id;
        const dados = req.body;
        const tecnico = new Tecnico();
        const result = await tecnico.atualizarDadosContato(id, dados);
        res.status(result.status).json(result.desc);
    }
}
export default CtrlTecnico;