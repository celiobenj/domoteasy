import { Router } from 'express';
import CtrlAssinatura from '../ctrl/ctrl-assinatura.js';
import verificarToken from '../sec/authMiddleware.js'; // Importante para pegar o ID do user

const router = Router();
const ctrl = new CtrlAssinatura();

router.post('/contratar', verificarToken, ctrl.novaAssinatura);
router.get('/meu-plano', verificarToken, ctrl.obterMinhaAssinatura);
router.patch('/cancelar', verificarToken, ctrl.cancelar);

export default router;