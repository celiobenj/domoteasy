import { openDb } from '../db/configdb.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

class Usuario {
    constructor(id = 0, nome = "", email = "", senhaHash = "", tipoAssinatura = "Comum") {
        this.tipoAssinatura = tipoAssinatura
    }

    async cadastro(nome, email, senha) {
        const db = await openDb();
        try {
            const usuarioExistente = await db.get(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            );
        
            if (usuarioExistente) {
                return { status: 409, desc: { erro: "Este e-mail já está cadastrado." }};
            }
            
            const senhaHasheada = await hashearSenha(senha)
            const result = await registrarUsuario(db, nome, email, senhaHasheada, this.tipoAssinatura);

            return { status: 201, desc: result }

        } catch (error) {
            console.error("Erro no cadastro:", error);
            return { status: 500, desc: { erro: "Erro ao salvar usuário." }};
        }
    }

    async login(email, senha) {
        const db = await openDb();
        
        try {
            const usuario = await db.get(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            );

            if (!usuario) {
                return { status: 401, desc: { erro: "Email inválido." }};
            }

            const senhaValida = await compararSenha(senha, usuario.senhaHash);

            if (!senhaValida) {
                return { status: 401, desc: { erro: "Senha inválida." }};
            }

            const payload = { id: usuario.id, email: usuario.email };
            const token = jwt.sign(
                payload, 
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return { status: 200, desc: { token: token , id: usuario.id} };

        } catch (error) {
            console.error("Erro no login:", error);
            return { status: 500, desc: { erro: "Erro interno no login." }};
        }
    }

    async atualizarDados(id, senhaAtual, novaSenha) {
        const db = await openDb();

        try {
            const usuarioPreMod = await db.get(
                'SELECT * FROM usuarios WHERE id = ?',
                [id]
            );

            if (!usuarioPreMod) {
                return { status: 409, desc: { erro: "Este usuário não existe"} }
            }

            if (!senhaAtual) {
                return { status: 400, desc: { erro: "Senha atual é obrigatória"}}
            }
            
            const senhaAtualValida = await compararSenha(senhaAtual, usuarioPreMod.senhaHash);
            if (!senhaAtualValida) {
                return { status: 401, desc: { erro: "Senha atual inválida"}}
            }

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

            return { status: 200, desc: usuarioPosMod}
        }
        catch (error) {
            return { status: 500, desc: "Erro ao modificar informações"}
        }
    }

    async obterInformacoes(id) {
        const db = await openDb();

        try {
            const usuario = await db.get(
                'SELECT nome, email, tipoAssinatura FROM usuarios WHERE id = ?',
                [id]
            );

            if (!usuario) {
                return { status: 404, desc: "Este usuário não existe"}
            }

            return { status: 200, desc: usuario}
        }
        catch (error) {
            return { status: 500, desc: "Erro ao obter informações"}
        }
    }

    async obterNome(id) {
        const db = await openDb();

        try {
            const usuario = await db.get(
                'SELECT nome FROM usuarios WHERE id = ?',
                [id]
            );

            if (!usuario) {
                return { status: 404, desc: "Este usuário não existe"}
            }

            return { status: 200, desc: { nome: usuario.nome }}
        }
        catch (error) {
            return { status: 500, desc: "Erro ao obter nome"}
        }
    }
}

async function registrarUsuario(db, nome, email, senha, tipoAssinatura) {
    const result = await db.run(
        'INSERT INTO usuarios (nome, email, senhaHash, tipoAssinatura) VALUES (?, ?, ?, ?)',
        [nome, email, senha, tipoAssinatura]
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

export default Usuario