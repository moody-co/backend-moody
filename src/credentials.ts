import type { Request } from "express";
import { http } from "./errors";

export function credentials(req: Request) {
  const { email, password } = req.body;
  if (!email || !password) throw http(400, "email e senha obrigatórios");
  return { email, password } as { email: string; password: string };
}
