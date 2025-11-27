import Usuario from '../entidades/e-usuario.js';
import Tecnico from '../entidades/e-tecnico.js';

class CtrlGestao {
    // SD11: Gestão de Usuários
    async listarUsuarios(req, res) {
        const usuario = new Usuario();
        const result = await usuario.buscarTodos();
        res.status(result.status).json(result.desc);
    }

    async modificarUsuario(req, res) {
        const { idUsuario } = req.params;
        const dados = req.body;
        const usuario = new Usuario();
        const result = await usuario.atualizarDadosAdm(idUsuario, dados);
        res.status(result.status).json(result.desc);
    }

    // SD13: Gestão de Profissionais
    async gerenciarProfissional(req, res) {
        const { idTecnico, acao } = req.body; // acao: 'aprovar', 'reprovar', 'desativar', 'reativar'
        const tecnico = new Tecnico();
        
        // consertar para modificar com as informações completas do tecnico

        let status;
        switch(acao) {
            case 'aprovar': status = 'ativo'; break;
            case 'reprovar': status = 'reprovado'; break;
            case 'desativar': status = 'inativo'; break;
            case 'reativar': status = 'ativo'; break;
            default: return res.status(400).json({ erro: "Ação inválida." });
        }

        const result = await tecnico.atualizarStatus(idTecnico, status);
        res.status(result.status).json(result.desc);
    }
}
export default CtrlGestao; 