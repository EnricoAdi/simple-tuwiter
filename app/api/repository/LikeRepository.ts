import { Prisma } from "@prisma/client";
import { IRepository } from "./_IRepository";
import prisma from "@/services/Prisma";

export default new class LikeRepository implements IRepository {
  create(newLike : Prisma.likeCreateInput) {
    return prisma.like.create({
      data : newLike
    }) 
  }
  update(like_id:number, data:Prisma.likeUpdateInput) {
    return prisma.like.update({
      where:{
          like_id
      },
      data
    })
  }
  delete(like_id:number) {
    return prisma.like.delete({
      where:{
        like_id
      }
    })
  }
  deleteByUserAndTweet(user_id:number, tweet_id:number) {
    return prisma.like.deleteMany({
      where:{
        user_id,
        tweet_id
      }
    })
  }
  get(like_id:number) {
    return prisma.like.findFirst({
      where:{
        like_id
      }
    })
  }
  getByUserAndTweet(user_id:number, tweet_id:number) {
    return prisma.like.findFirst({
      where:{
        user_id,
        tweet_id
      }
    })
  }
  fetch(tweet_id:number) {
    return prisma.like.findMany({
      where:{
        tweet_id
      }
    });
  }

}