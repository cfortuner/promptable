import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const chainRouter = createTRPCRouter({
    getTraces: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.chain.findMany();
        const chains: any[] = [];
        for (const d of data) {
          console.log(d.trace);
          chains.push(JSON.parse(d.trace));
        }
        return chains;
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
