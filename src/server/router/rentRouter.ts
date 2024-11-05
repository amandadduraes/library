import { initTRPC } from "@trpc/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const t = initTRPC.create();

export const rentRouter = t.router({
  rentBook: t.procedure
    .input(z.object({ userId: z.number(), bookId: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.rental.create({ data: { ...input, returned: false } });
    }),
  returnBook: t.procedure
    .input(z.object({ rentalId: z.number() }))
    .mutation(async ({ input }) => {
      return await prisma.rental.update({
        where: { id: input.rentalId },
        data: { returned: true },
      });
    }),
});
