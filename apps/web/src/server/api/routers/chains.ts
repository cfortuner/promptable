import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const chainRouter = createTRPCRouter({
    getAll: publicProcedure.query(({ ctx }) => {
        return ctx.prisma.chain.findMany();
    }),
    add: publicProcedure
        .input(z.object({ scopeId: z.string(), trace: z.string() }))
        .mutation(({ input, ctx }) => {
            ctx.prisma.chain.create({
                data: {
                    scopeId: input.scopeId,
                    trace: input.trace,
                },
            })
        })
});
