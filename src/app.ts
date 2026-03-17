import express from 'express';
import authRoutes from './routes/auth.routes';

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
    return res.json({ message: 'API Rodando' });
});

app.use('/auth', authRoutes);

export default app;