import { Router } from 'express';
import CtrlPlano from '../ctrl/plano.js';

const router = Router();
const ctrl = new CtrlPlano();

router.get('/', ctrl.listar);
router.post('/', ctrl.criar); // Cuidado: em prod, proteger essa rota!

export default router;