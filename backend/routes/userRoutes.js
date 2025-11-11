import { Router } from 'express'
import CtrlUsuario from '../ctrl/usuario.js'
import verificarToken from '../sec/authMiddleware.js'

const userRouter = Router()
const ctrlUsuario = new CtrlUsuario;

userRouter.post('/cadastro', ctrlUsuario.cadastro)
userRouter.post('/login', ctrlUsuario.login)
userRouter.patch('/atualizar', verificarToken, ctrlUsuario.atualizarDados)
userRouter.get('/info', verificarToken, ctrlUsuario.obterInformacoes)

export default userRouter