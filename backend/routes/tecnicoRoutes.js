import { Router } from 'express';
import CtrlTecnico from '../ctrl/ctrl-tecnico.js';
import verificarToken from '../sec/authMiddleware.js';

const router = Router();
const ctrl = new CtrlTecnico();

router.get('/', verificarToken, ctrl.listar); 
router.get('/id/:id', verificarToken, ctrl.obterPorId); // Detalhes SD06
router.get('/email/:email', verificarToken, ctrl.obterPorEmail);
router.post('/registro', ctrl.cadastro); 

export default router;