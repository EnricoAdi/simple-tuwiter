import { z } from 'zod';
import {initTRPC} from "@trpc/server"
import NextAuth, { getServerSession, Session } from "next-auth"
import GetUserSessionUseCase from '@/app/api/use-case/auth/GetUserSessionUseCase';
import CreateTweetUseCase from '@/app/api/use-case/tweet/CreateTweetUseCase';
import LikeRepository from '@/app/api/repository/LikeRepository';
import ToggleLikeUseCase from '@/app/api/use-case/tweet/ToggleLikeUseCase';

const t = initTRPC.create();

export const likeRouter = t.router({
  toggleLike: t.procedure.input(z.object({
    tweet_id:z.number(), 
  })).mutation(async (opts)=>{
    const user = await GetUserSessionUseCase.execute()
    const {tweet_id} = opts.input
    const newLike = await ToggleLikeUseCase.execute(user.user_id,tweet_id)
    let msg = "Like"
    if(!newLike) msg = "Unlike"
    return {
      data:newLike,
      message:`${msg} success`
    }
  }),
})