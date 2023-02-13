import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const chainRouter = createTRPCRouter({
    getTraces: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.chain.findMany();
        const chains: any[] = [];
        for (const d of data) {
          chains.push(JSON.parse(d.trace));
        }
        return chains;
    }),
    add: publicProcedure
        .input(z.object({ scopeId: z.string(), trace: z.string() }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.chain.create({
                data: {
                    scopeId: input.scopeId,
                    trace: input.trace,
                },
            })
        })
});
