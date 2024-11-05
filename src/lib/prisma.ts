import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

prisma.$connect()
  .then(() => console.log("Conectado ao banco de dados com sucesso"))
  .catch((error: unknown) => console.error("Erro ao conectar ao banco de dados:", error));

export { prisma };
