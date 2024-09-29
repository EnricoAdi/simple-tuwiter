import { z } from 'zod';
import {initTRPC} from "@trpc/server"
import { tweetRouter } from './router/tweetRouter';
import { userRouter } from './router/userRouter';
import { likeRouter } from './router/likeRouter';

const t = initTRPC.create();
export const appRouter = t.router({
  tweet: tweetRouter,
  user: userRouter,
  like: likeRouter,
});
export type AppRouter = typeof appRouter;

// https://github.com/jherr/trpc-on-the-app-router/blob/main/src/server/index.ts