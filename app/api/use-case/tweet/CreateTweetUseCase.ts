import TweetRepository from "../../repository/TweetRepository"

const CreateTweetUseCase = {
  async execute(title:string,content:string,user_id:number){
    const newTweet = await TweetRepository.create({
      tweet_title:title,
      tweet_content:content,
      user:{
        connect:{
          user_id 
        }
      }
    })
    return newTweet
  }
}
export default CreateTweetUseCase