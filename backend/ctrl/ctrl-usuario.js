import Usuario from '../entidades/e-usuario.js';

// Validation helpers (The Brain - Business Logic)
const validarEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

const validarSenha = (senha) => {
    if (!senha || senha.length < 8) {
        return { valida: false, erro: "A senha deve ter no mínimo 8 caracteres." };
    }
    if (!/[a-zA-Z]/.test(senha)) {
        return { valida: false, erro: "A senha deve conter pelo menos uma letra." };
    }
    if (!/[0-9]/.test(senha)) {
        return { valida: false, erro: "A senha deve conter pelo menos um número." };
    }
    return { valida: true };
};

class CtrlUsuario {

    async cadastro(req, res) {
        const { nome, email, senha } = req.body;

        // Strong validation in controller (MVC - The Brain)
        if (!email || !validarEmail(email)) {
            return res.status(400).json({ desc: { erro: "Email inválido." } });
        }

        const validacaoSenha = validarSenha(senha);
        if (!validacaoSenha.valida) {
            return res.status(400).json({ desc: { erro: validacaoSenha.erro } });
        }

        const usuario = new Usuario()
        const result = await usuario.cadastro(nome, email, senha)

        res.status(result.status).json(result.desc)
    }

    async login(req, res) {
        const { email, senha } = req.body;

        const usuario = new Usuario()
        const result = await usuario.login(email, senha)

        res.status(result.status).json(result.desc)
    }

    async atualizarDados(req, res) {
        const id = req.usuario.id;
        const { senhaAtual, novaSenha } = req.body;

        // Validate new password if provided
        if (novaSenha) {
            const validacaoSenha = validarSenha(novaSenha);
            if (!validacaoSenha.valida) {
                return res.status(400).json({ desc: { erro: validacaoSenha.erro } });
            }
        }

        const usuario = new Usuario()
        const result = await usuario.atualizarDados(id, senhaAtual, novaSenha)

        res.status(result.status).json(result.desc)
    }

    async obterInformacoes(req, res) {
        const id = req.usuario.id;

        const usuario = new Usuario()
        const result = await usuario.obterInformacoes(id)

        res.status(result.status).json(result.desc)
    }

    async obterNome(req, res) {
        const id = req.usuario.id;

        const usuario = new Usuario()
        const result = await usuario.obterNome(id)

        res.status(result.status).json(result.desc)
    }
}

export default CtrlUsuario;