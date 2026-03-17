import { Router } from "express";
import jwt from 'jsonwebtoken';

const router = Router();

router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'email e senha obrigatórios' });
    }


    //temporario
    if (email !== 'teste@email.com' || password !== '123456') {
        return res.status(401).json({ message: 'credenciais inválidas' });
    }

    const token = jwt.sign(
        { email },
        process.env.JWT_SECRET as string,
        { expiresIn: '1h' }
    );

    return res.json({
        message: 'login realizado com sucesso',
        token
    });
});

export default router;