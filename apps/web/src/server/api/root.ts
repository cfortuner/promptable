import { createTRPCRouter } from "./trpc";
import { traceRouter } from "./routers/traces";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  trace: traceRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
