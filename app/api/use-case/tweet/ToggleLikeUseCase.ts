import LikeRepository from "../../repository/LikeRepository"

const ToggleLikeUseCase = {
  async execute(user_id:number,tweet_id:number){
    const likeByUser = await LikeRepository.getByUserAndTweet(user_id,tweet_id)
    if(likeByUser){
      await LikeRepository.delete(likeByUser.like_id)
      return null
    }
    let like = await LikeRepository.create({
      user:{
        connect:{
          user_id
        }
      },
      tweet:{
        connect:{
          tweet_id
        }
      }
    })
    return like
  }
}
export default ToggleLikeUseCase