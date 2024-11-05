import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { postRouter } from './router/postRouter';
import { rentRouter } from './router/rentRouter';
import { bookRouter } from './router/bookRouter';
import { favoriteRouter } from './router/favoriteBookRouter';
import { authRouter } from './router/auth';


const t = initTRPC.create({
  transformer: superjson, 
});

export const appRouter = t.router({
  post: postRouter,
  book: bookRouter,
  favorite: favoriteRouter,
  rental: rentRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
