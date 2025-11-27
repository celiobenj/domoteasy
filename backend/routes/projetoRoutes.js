import { Router } from 'express';
import CtrlProjeto from '../ctrl/ctrl-projeto.js';
import verificarToken from '../sec/authMiddleware.js';

const router = Router();
const ctrl = new CtrlProjeto();

router.post('/', verificarToken, ctrl.criar);
router.get('/', verificarToken, ctrl.listarMeusProjetos);
router.post('/itens', verificarToken, ctrl.atualizarItens);

export default router;
