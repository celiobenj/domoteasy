import Assinatura from '../entidades/e-assinatura.js';

class CtrlAssinatura {
    async novaAssinatura(req, res) {
        // O ID do usuário vem do Token JWT (req.usuario.id)
        const idUsuario = req.usuario.id;
        const { idPlano } = req.body;

        if (!idPlano) {
            return res.status(400).json({ erro: "ID do plano é obrigatório." });
        }

        const assinatura = new Assinatura();
        const result = await assinatura.criarAssinatura(idUsuario, idPlano);
        res.status(result.status).json(result.desc);
    }

    async obterMinhaAssinatura(req, res) {
        const idUsuario = req.usuario.id;
        const assinatura = new Assinatura();
        const result = await assinatura.buscarPorUsuario(idUsuario);
        res.status(result.status).json(result.desc);
    }

    async cancelar(req, res) {
        const idUsuario = req.usuario.id;
        const assinatura = new Assinatura();
        const result = await assinatura.cancelar(idUsuario);
        res.status(result.status).json(result.desc);
    }
}

export default CtrlAssinatura;