import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { setupDatabase } from './db/configdb.js';

// Importar Rotas
import userRouter from './routes/userRoutes.js';
import planoRouter from './routes/planoRoutes.js';
import assinaturaRouter from './routes/assinaturaRoutes.js';
import pagamentoRouter from './routes/pagamentoRoutes.js';

dotenv.config();
setupDatabase();

const app = express();
const port = 3000;

app.use(cors());
app.use(json());

// Definição de endpoints
app.use('/usuario', userRouter);
app.use('/planos', planoRouter);
app.use('/assinatura', assinaturaRouter);
app.use('/pagamentos', pagamentoRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});