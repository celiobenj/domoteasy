import express, { json } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { setupDatabase } from './db/configdb.js';

// Rotas Originais
import userRouter from './routes/userRoutes.js';
import planoRouter from './routes/planoRoutes.js';
import assinaturaRouter from './routes/assinaturaRoutes.js';
import pagamentoRouter from './routes/pagamentoRoutes.js';

// Novas Rotas
import tecnicoRouter from './routes/tecnicoRoutes.js';
import projetoRouter from './routes/projetoRoutes.js';
import orcamentoRouter from './routes/orcamentoRoutes.js';
import conteudoRouter from './routes/conteudoRoutes.js';
import adminRouter from './routes/adminRoutes.js';

dotenv.config();
setupDatabase();

const app = express();
const port = 3000;

app.use(cors());
app.use(json());

// Endpoints
app.use('/usuario', userRouter);
app.use('/planos', planoRouter);
app.use('/assinatura', assinaturaRouter);
app.use('/pagamentos', pagamentoRouter);

// Novos Endpoints
app.use('/tecnicos', tecnicoRouter);
app.use('/projetos', projetoRouter);
app.use('/orcamentos', orcamentoRouter);
app.use('/conteudo', conteudoRouter);
app.use('/admin', adminRouter); // Ponto único para gestão (SD11/12/13)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});