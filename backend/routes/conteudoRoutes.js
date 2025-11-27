import { Router } from 'express';
import CtrlDispositivo from '../ctrl/ctrl-dispositivo.js';
import verificarToken from '../sec/authMiddleware.js';

const router = Router();
const ctrl = new CtrlDispositivo();

router.get('/dispositivos', verificarToken, ctrl.listar);
router.post('/admin/criar', verificarToken, ctrl.criar); // Admin
router.get('/manual/:idDispositivo', verificarToken, ctrl.acessarManual); // Premium

export default router;