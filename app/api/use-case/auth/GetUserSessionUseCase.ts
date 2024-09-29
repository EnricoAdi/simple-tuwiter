import { NextApiRequest, NextApiResponse, GetServerSidePropsContext } from "next"
import NextAuth, { getServerSession, Session, UserProfileSession } from "next-auth" 
import { NextRequest } from "next/server";
import { authOptions } from "../../auth-logic/auth";
import { TRPCError } from "@trpc/server";

//extend user type
declare module "next-auth" {
  interface UserProfileSession {
    email: string,
    user_id: number
    name: string
    picture: string
    role: string // Add the 'role' property as optional
  }
  // interface Session extends DefaultSession {
  //   user: {
  //     user_id: number;
  //     role: number; 
  //   } & DefaultSession["user"];
  // }
}
const GetUserSessionUseCase = {
  async _validateServerSession(session:Session|null){
    if(session==null) throw new TRPCError({
      code:"UNAUTHORIZED",
      message:"User not authenticated"
    })
    let cekUser = session.user
    if(cekUser==null) throw new TRPCError({
      code:"UNAUTHORIZED",
      message:"User not authenticated"
    })
    const user = session.user as UserProfileSession
    return {
      user 
    }
  },
  async execute(){
    const session = await getServerSession(authOptions)
    const {user} = await this._validateServerSession(session)
    const returnUser = {
      ...user,
      email: user.email, 
      picture : user.picture+"",
    }
    return returnUser
  },
  // async executeSSR(context:GetServerSidePropsContext){
  //   const session = await getServerSession(context.req, context.res, authOptions)
  //   const {user, userFromDb} = await this._validateServerSession(session)
  //   const notifications = await Notification.fetchByUserIdWithLimit(user.user_id,5)

  //   CheckRabbitMqUseCase.execute()

  //   let notificationsParsed:NotificationEntity[] = []
  //   notifications.forEach((n)=>{
  //     notificationsParsed.push({
  //       ...n,
  //       created_at: n.created_at+""
  //     })
  //   })
  //   const returnUser:UserProfileEntity = {
  //     ...user,
  //     first_name: userFromDb.first_name,
  //     last_name: userFromDb.last_name,
  //     email: userFromDb.email,
  //     picture: userFromDb.picture,
  //     phone : userFromDb.phone+"",
  //     verified_at: userFromDb.verified_at+"",
  //     notifications : notificationsParsed
  //   }
  //   return returnUser
  // },
  async executeAdmin(){
    const session = await getServerSession(authOptions)
    if(session==null) throw new TRPCError({
      code:"UNAUTHORIZED",
      message:"User not authenticated"
    })
    
    let cekUser = session.user
    if(cekUser==null) throw new TRPCError({
      code:"UNAUTHORIZED",
      message:"User not authenticated"
    })
    
    const user = session.user as UserProfileSession 
    if(user.role!=="admin") throw new TRPCError({
      code:"UNAUTHORIZED",
      message:"Not admin"
    })
    
    const returnUser = {
      ...user,
      email: user.email,
      picture : user.picture
    }
    return returnUser
  }
}
export default GetUserSessionUseCase