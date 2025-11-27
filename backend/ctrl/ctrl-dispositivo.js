import Dispositivo from '../entidades/e-dispositivo.js';
import Usuario from '../entidades/e-usuario.js';

class CtrlDispositivo {
    async criar(req, res) { // Apenas Admin
        const { dispositivo, manual } = req.body;
        const dispEntity = new Dispositivo();
        const result = await dispEntity.criarDispositivoComManual(dispositivo, manual);
        res.status(result.status).json(result.desc);
    }

    async listar(req, res) {
        const dispEntity = new Dispositivo();
        const result = await dispEntity.listarTodos();
        res.status(result.status).json(result.desc);
    }

    // SD09: Acessar Manual (Verifica Premium)
    async acessarManual(req, res) {
        const idUsuario = req.usuario.id;
        const { idDispositivo } = req.params;

        const usuario = new Usuario();
        const permit = await usuario.acessarManual(idUsuario);

        if (!permit.canAccess) {
            res.status(permit.status).json(permit.desc)
            return
        }

        const dispEntity = new Dispositivo();
        const result = await dispEntity.buscarManualPorDispositivo(idDispositivo);
        res.status(result.status).json(result.desc);
    }

    async remover(req, res) {
        const { id } = req.params;
        const dispEntity = new Dispositivo();
        const result = await dispEntity.remover(id);
        res.status(result.status).json(result.desc);
    }

    async atualizar(req, res) {
        const { id } = req.params;
        const dados = req.body;
        const dispEntity = new Dispositivo();
        const result = await dispEntity.atualizar(id, dados);
        res.status(result.status).json(result.desc);
    }
}
export default CtrlDispositivo;