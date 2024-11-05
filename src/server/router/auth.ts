import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";

const t = initTRPC.create();

export const authRouter = t.router({
  register: t.procedure
    .input(
      z.object({
        username: z.string().min(3, "O nome de usuário deve ter pelo menos 3 caracteres"),
        password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
      })
    )
    .mutation(async ({ input }) => {
      const { username, password } = input;

      const existingUser = await prisma.login.findUnique({ where: { username } });
      if (existingUser) {
        throw new Error("Usuário já existe");
      }

      const passwordHash = await bcrypt.hash(password, 10);

      const user = await prisma.login.create({
        data: { username, passwordHash },
      });

      return { message: "Usuário registrado com sucesso", userId: user.id };
    }),

  login: t.procedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      const { username, password } = input;

      const user = await prisma.login.findUnique({ where: { username } });
      if (!user) {
        throw new Error("Usuário não encontrado");
      }

      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
      if (!isPasswordValid) {
        throw new Error("Senha incorreta");
      }

      return { message: "Login bem-sucedido", userId: user.id, username: user.username };
    }),
});
