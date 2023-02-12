import { createTRPCRouter } from "./trpc";
import { chainRouter } from "./routers/chains";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  chain: chainRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
