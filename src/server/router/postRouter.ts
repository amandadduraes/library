import { initTRPC } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma'; 



const t = initTRPC.create();

export const postRouter = t.router({
  getAll: t.procedure.query(async () => {
    return await prisma.post.findMany();
  }),
  create: t.procedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        userId: z.number(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        return await prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            user: { connect: { id: input.userId } }, 
          },
        });
      } catch (error) {
        console.error("Erro ao criar post:", error);
        throw new Error("Erro ao criar post");
      }
    }),
});
