import Usuario from '../entidades/e-usuario.js';

// jogar parte de banco de dados para entidade - FEITO
// verificação de formato de senha no ctrl - A FAZER
// pedir para o Célio mandar a função de verificação de senha

class CtrlUsuario {

    async cadastro(req, res) {
        const { nome, email, senha } = req.body;

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

    async atualizarDados(req, res){
        const id = req.usuario.id;
        const { senhaAtual, novaSenha } = req.body;
        
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