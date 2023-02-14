import { createTRPCRouter } from "./trpc";
import { chainRouter } from "./routers/chains";
import { traceRouter } from "./routers/traces";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  chain: chainRouter,
  trace: traceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
