import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const traceRouter = createTRPCRouter({
    getTraces: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.trace.findMany();
        const traces: any[] = [];
        for (const d of data) {
          traces.push(JSON.parse(d.trace));
        }
        return traces;
    }),
    add: publicProcedure
        .input(z.object({trace: z.any()}))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.trace.create({
                data: {
                    trace: JSON.stringify(input.trace)
                }
            })
        })
});