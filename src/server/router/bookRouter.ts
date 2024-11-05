import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const t = initTRPC.create();

export const bookRouter = t.router({
  getAll: t.procedure.query(async () => {
    return await prisma.book.findMany();
  }),
  getById: t.procedure.input(z.number()).query(async ({ input }) => {
    return await prisma.book.findUnique({ where: { id: input } });
  }),
  addBook: t.procedure
    .input(z.object({ title: z.string(), author: z.string(), description: z.string(), imageUrl: z.string() }))
    .mutation(async ({ input }) => {
      return await prisma.book.create({ data: input });
    }),
  update: t.procedure
    .input(z.object({
      id: z.number(),
      data: z.object({
        title: z.string().optional(),
        author: z.string().optional(),
        description: z.string().optional(),
        imageUrl: z.string().optional(),
        isAvailable: z.boolean(),
        reservedBy: z.string().nullable(),
      }),
    }))
    .mutation(async ({ input }) => {
      return await prisma.book.update({
        where: { id: input.id },
        data: input.data,
      });
    }),
});
