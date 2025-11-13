import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Usuario from '../entidades/usuario.js';

// jogar parte de banco de dados para entidade
// verificação de formato de senha no ctrl

class CtrlUsuario {

    async cadastro(req, res) {
        const { nome, email, senha } = req.body;

        senhaHasheada = hashearSenha(senha)
        const usuario = new Usuario(nome, email, senhaHasheada)
        const result = await usuario.cadastro()

        res.status(result.status).json(result.desc)
    }

    async login(req, res) {
        const { email, senha } = req.body;

        senhaHasheada = hashearSenha(senha)
        const usuario = new Usuario("", email, senha)
    }

    async atualizarDados(req, res){
        const id = req.usuario.id;
        const { senhaAtual, novaSenha } = req.body;
        const db = await openDb();

        try {
            const usuarioPreMod = await db.get(
                'SELECT * FROM usuarios WHERE id = ?',
                [id]
            );

            if (!usuarioPreMod) {
                return res.status(409).json({ erro: "Este usuário não existe" });
            }

            // Validar senha atual
            if (!senhaAtual) {
                return res.status(400).json({ erro: "Senha atual é obrigatória" });
            }

            const senhaAtualValida = await compararSenha(senhaAtual, usuarioPreMod.senhaHash);
            if (!senhaAtualValida) {
                return res.status(401).json({ erro: "Senha atual inválida" });
            }

            // Validar e atualizar nova senha
            if (novaSenha) {
                const senhaHash = await hashearSenha(novaSenha);
                await db.run(
                    'UPDATE usuarios SET senhaHash = ? WHERE id = ?',
                    [senhaHash, id]
                );
            }

            const usuarioPosMod = await db.get(
                'SELECT nome, email, tipoAssinatura FROM usuarios WHERE id = ?',
                [id]
            );

            res.status(200).json(usuarioPosMod);
        }
        catch (error) {
            res.status(500).json({ erro: "Erro ao modificar informações"});
        }

    }

    async obterInformacoes(req, res) {
        const id = req.usuario.id;
        const db = await openDb();

        try {
            const usuario = await db.get(
                'SELECT nome, email, tipoAssinatura FROM usuarios WHERE id = ?',
                [id]
            );

            if (!usuario) {
                return res.status(404).json({ erro: "Este usuário não existe" });
            }

            res.status(200).json(usuario);
        }
        catch (error) {
            res.status(500).json({ erro: "Erro ao obter informações"});
        }
    }

    async obterNome(req, res) {
        const id = req.usuario.id;
        const db = await openDb();

        try {
            const usuario = await db.get(
                'SELECT nome FROM usuarios WHERE id = ?',
                [id]
            );

            if (!usuario) {
                return res.status(404).json({ erro: "Este usuário não existe" });
            }

            res.status(200).json({ nome: usuario.nome });
        }
        catch (error) {
            res.status(500).json({ erro: "Erro ao obter nome"});
        }
    }
}

const hashearSenha = (senha) => bcrypt.hash(senha, 10);
const compararSenha = (senha, hash) => bcrypt.compare(senha, hash);

export default CtrlUsuario;