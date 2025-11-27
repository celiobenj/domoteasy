import { Router } from 'express';
import CtrlGestao from '../ctrl/ctrl-gestao.js';
import verificarToken from '../sec/authMiddleware.js';

const router = Router();
const ctrl = new CtrlGestao();

// SD11 - Usuários
router.get('/usuarios', verificarToken, ctrl.listarUsuarios);
router.patch('/usuarios/:idUsuario', verificarToken, ctrl.modificarUsuario);

// SD13 - Profissionais
router.get('/profissionais', verificarToken, ctrl.listarTodosTecnicos);
router.post('/profissionais/status', verificarToken, ctrl.gerenciarProfissional);
router.delete('/profissionais/:idTecnico', verificarToken, ctrl.excluirProfissional);

export default router;