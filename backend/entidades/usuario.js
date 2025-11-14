import { openDb } from '../db/configdb.js'

class Usuario {
    constructor(id = 0, nome = "", email = "", senhaHash = "", tipoAssinatura = "Comum") {}

    async cadastro(nome, email, senha) {
        const db = await openDb();

        try {
            const usuarioExistente = await db.get(
                'SELECT * FROM usuarios WHERE email = ?',
                [email]
            );
        
            if (usuarioExistente) {
                return { isError: true, status: 409, desc: { erro: "Este e-mail já está cadastrado." }};
            }
            
            const senhaHasheada = await hashearSenha(senha)
            const result = await registrarUsuario(db, nome, email, senhaHasheada);

            return { isError: false, status: 201, desc: result }

        } catch (error) {
            console.error("Erro no cadastro:", error);
            return { isError: true, status: 500, desc: { erro: "Erro ao salvar usuário." }};
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
                return { isError: true, status: 401, desc: { erro: "Email inválido." }};
            }

            const senhaValida = await compararSenha(senha, usuario.senhaHash);

            if (!senhaValida) {
                return { isError: true, status: 401, desc: { erro: "Senha inválida." }};
            }

            const payload = { id: usuario.id, email: usuario.email };
            const token = jwt.sign(
                payload, 
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            return { isError: true, status: 200, desc: { token: token , id: usuario.id} };

        } catch (error) {
            console.error("Erro no login:", error);
            return { isError: true, status: 500, desc: { erro: "Erro interno no login." }};
        }
    }
}

async function registrarUsuario(db, nome, email, senha) {
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

export default Usuario