import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const t = initTRPC.create();

export const favoriteRouter = t.router({
  getFavorites: t.procedure
    .input(z.number()) 
    .query(async ({ input }) => {
      return await prisma.favorite.findMany({
        where: { userId: input },
        include: { book: true },
      });
    }),

    getByUserId: t.procedure.input(z.object({ userId: z.number() })).query(async ({ input }) => {
      return await prisma.favorite.findMany({
        where: { userId: input.userId },
        include: { book: true },
      });
    }),
});
