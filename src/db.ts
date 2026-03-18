import { PrismaClient } from "./generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const url = process.env.DATABASE_URL;
if (!url) {
  throw new Error("Defina DATABASE_URL no arquivo .env");
}

export const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: url }),
});
