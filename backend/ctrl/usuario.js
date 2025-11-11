import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { openDb } from '../db/configdb.js'
// import Usuario from '../entidades/usuario.js';

class CtrlUsuario {

    async cadastro(req, res) {
        const { nome, email, senha } = req.body;
        const db = await openDb();

        try {
            const usuarioExistente = await db.get(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            );

            if (usuarioExistente) {
                return res.status(409).json({ erro: "Este e-mail já está cadastrado." });
            }

            const result = await registrarUsuario(db, nome, email, senha);

            res.status(201).json(result);

        } catch (error) {
            console.error("Erro no cadastro:", error);
            res.status(500).json({ erro: "Erro ao salvar usuário." });
        }
    }

    async login(req, res) {
        const { email, senha } = req.body;
        const db = await openDb();

        try {
            const usuario = await db.get(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            );

            const senhaValida = await compararSenha(senha, usuario.senhaHash);

            if (!usuario ||!senhaValida) {
                return res.status(401).json({ erro: "Email ou senha inválidos." });
            }

            const payload = { id: usuario.id, email: usuario.email };
            const token = jwt.sign(
                payload, 
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.status(200).json({ token: token , id: usuario.id});

        } catch (error) {
            console.error("Erro no login:", error);
            res.status(500).json({ erro: "Erro interno no login." });
        }
    }

    async atualizarDados(req, res){
        const id = req.usuario.id;
        const { dados } = req.body;
        const db = await openDb();

        try {
            const usuarioPreMod = await db.get(
                'SELECT * FROM usuarios WHERE id = ?',
                [id]
            );

            if (!usuarioPreMod) {
                return res.status(409).json({ erro: "Este usuário não existe" });
            }

            if (dados.senha) {
                const senhaHash = await hashearSenha(dados.senha);
                await db.run(
                    'UPDATE usuarios SET senhaHash = ? WHERE id = ?',
                    [senhaHash, id]
                );
            }

            const usuarioPosMod = await db.get(
                'SELECT id, nome, email, tipoAssinatura FROM usuarios WHERE id = ?',
                [id]
            );

            res.status(200).json(usuarioPosMod);
        }
        catch (error) {
            res.status(500).json({ erro: "Erro ao modificar informações"});
        }

    }
}

async function registrarUsuario(db, nome, email, senha) {
    const senhaHash = await hashearSenha(senha);
    const tipoAssinatura = 'Comum';

    const result = await db.run(
        'INSERT INTO usuarios (nome, email, senhaHash, tipoAssinatura) VALUES (?, ?, ?, ?)',
        [nome, email, senhaHash, tipoAssinatura]
    );

    const novoId = result.lastID;

    const payload = { id: novoId, email: email };
    const token = jwt.sign(
        payload, 
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return { token: token, id: novoId };
}

const hashearSenha = (senha) => bcrypt.hash(senha, 10);
const compararSenha = (senha, hash) => bcrypt.compare(senha, hash);

export default CtrlUsuario;