import { TRPCError } from "@trpc/server"
import UserRepository from "../../repository/UserRepository"
const bcrypt = require('bcrypt') 

const RegisterUseCase = {
  async execute(username:string,password:string){
    let userExist = await UserRepository.get(username)
    if(userExist){
      throw new TRPCError({
        code:"BAD_REQUEST",
        message:"Username already exist"
      })
    }
    const hashedPass = await bcrypt.hash(password,10)
    const user = await UserRepository.create({
      username,
      password:hashedPass,
      picture:""
    })
    return user
  }
}
export default RegisterUseCase