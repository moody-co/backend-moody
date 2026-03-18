import express from "express";
import authRoutes from "./routes/auth.routes";
import { errorMiddleware } from "./errors";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ message: "API Rodando" });
});

app.use("/auth", authRoutes);

app.use(errorMiddleware);

export default app;
