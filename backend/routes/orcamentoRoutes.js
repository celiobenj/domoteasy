import { Router } from 'express';
import CtrlOrcamento from '../ctrl/ctrl-orcamento.js';
import verificarToken from '../sec/authMiddleware.js';

const router = Router();
const ctrl = new CtrlOrcamento();

router.post('/gerar', verificarToken, ctrl.gerar);

export default router;