import Projeto from '../entidades/e-projeto.js';

class CtrlProjeto {
    async criar(req, res) {
        const idUsuario = req.usuario.id;
        const { nome, descricao, preferencias, itens } = req.body; 
        const projeto = new Projeto();
        const result = await projeto.criar(idUsuario, nome, descricao, preferencias, itens);
        res.status(result.status).json(result.desc);
    }

    async listarMeusProjetos(req, res) {
        const idUsuario = req.usuario.id;
        const projeto = new Projeto();
        const result = await projeto.listarPorUsuario(idUsuario);
        res.status(result.status).json(result.desc);
    }
}
export default CtrlProjeto;