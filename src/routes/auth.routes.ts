import { Router } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../db";
import { credentials } from "../credentials";
import { asyncHandler, http } from "../errors";

const router = Router();

router.post(
    "/register",
    asyncHandler(async (req, res) => {
        const { email, password } = credentials(req);
        if (await prisma.user.findUnique({ where: { email } })) {
            throw http(409, "email already registered");
        }
        await prisma.user.create({
            data: { email, passwordHash: await bcrypt.hash(password, 10) },
        });
        res.status(201).json({ message: "cadastro realizado com sucesso" });
    })
);

router.post(
    "/login",
    asyncHandler(async (req, res) => {
        const { email, password } = credentials(req);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
            throw http(401, "email ou senha incorretos");
        }
        const secret = process.env.JWT_SECRET;
        if (!secret) throw http(500, "JWT_SECRET não configurado");
        res.json({
            message: "login ok",
            token: jwt.sign({ email }, secret, { expiresIn: "1h" }),
        });
    })
);

export default router;
