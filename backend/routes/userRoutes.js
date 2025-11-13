import { Router } from 'express'
import CtrlUsuario from '../ctrl/usuario.js'
import verificarToken from '../sec/authMiddleware.js'

const userRouter = Router()
const ctrlUsuario = new CtrlUsuario;

userRouter.post('/cadastro', ctrlUsuario.cadastro)
userRouter.post('/login', ctrlUsuario.login)
userRouter.patch('/atualizar', verificarToken, ctrlUsuario.atualizarDados)
userRouter.get('/info', verificarToken, ctrlUsuario.obterInformacoes)
userRouter.get('/nome', verificarToken, ctrlUsuario.obterNome)

export default userRouter