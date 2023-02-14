import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "../trpc";

export const traceRouter = createTRPCRouter({
    getTraces: publicProcedure.query(async ({ ctx }) => {
        const data = await ctx.prisma.chain.findMany();
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

// model Trace {
//     id       String  @id @default(cuid())
//     name     String
//     inputs   String // json string
//     outputs  String? // json string
//     tags     String // json string
//     parentId String
//     parent   Trace?  @relation("parentChild", fields: [parentId], references: [id])
//     children Trace[] @relation("parentChild")
//     error    String?
//     timestamp Int // unix time
// }

// export type Trace = {
//     name: string;
//     inputs: any[];
//     outputs: any | null;
//     tags: string[];
//     id: string;
//     parentId: string | undefined;
//     children: Trace[];
//     error?: any;
//     timestamp: number;
//   };