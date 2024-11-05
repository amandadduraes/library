import { createNextApiHandler } from '@trpc/server/adapters/next';
import { appRouter } from '@/server/appRouter';

export default createNextApiHandler({
  router: appRouter,
  createContext: () => ({}),
});
