import { TRPCError } from "@trpc/server"
import TweetRepository from "../../repository/TweetRepository"

const DeleteTweetUseCase = {
  async execute(user_id:number,tweet_id:number){
    if(user_id==999){
      //admin
      await TweetRepository.delete(tweet_id)
    }else{
      //check if tweet's user_id is equal to user_id
      let tweet = await TweetRepository.get(tweet_id)
      if(!tweet) {
        throw new TRPCError({
          code:"NOT_FOUND",
          message:"Tweet not found"
        })
      }
      if(tweet.user_id!=user_id){
        throw new TRPCError({
          code:"UNAUTHORIZED",
          message:"This tweet is not yours"
        })
      }
      await TweetRepository.delete(tweet_id)
    }
  }
}
export default DeleteTweetUseCase