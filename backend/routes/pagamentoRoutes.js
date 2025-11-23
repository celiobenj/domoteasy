import { Router } from 'express';
import CtrlPagamento from '../ctrl/ctrl-pagamento.js';
import verificarToken from '../sec/authMiddleware.js';

const router = Router();
const ctrl = new CtrlPagamento();

// Geralmente pagamentos exigem autenticação para vincular ao user correto
router.post('/', verificarToken, ctrl.processar);

export default router;