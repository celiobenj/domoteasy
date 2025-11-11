import express, { json } from 'express';
import dotenv from 'dotenv';
import userRouter from './routes/userRoutes.js';

dotenv.config();

const app = express();
const port = 3000;

app.use(json())

app.use('/usuario', userRouter);

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});