import UserRepository from "../../repository/UserRepository"
import { TRPCError } from "@trpc/server"
const UpdateProfileUseCase = {
  async execute(user_id:number,username:string,picture:string){ 
    let userExist = await UserRepository.get(username)
    if(userExist && userExist.user_id!=user_id){
      throw new TRPCError({
        code:"BAD_REQUEST",
        message:"Username already exist"
      })
    }
    const user = await UserRepository.update(user_id,{
      username, picture
    })
    return user
  }
}
export default UpdateProfileUseCase