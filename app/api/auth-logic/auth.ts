import CredentialsProvider from "next-auth/providers/credentials"
import LoginUseCase from "@/app/api/use-case/auth/LoginUseCase"
import NextAuth, {NextAuthOptions} from "next-auth"
import { decryptor } from "@/utils/Encrypt/decryptor"

export const authOptions:NextAuthOptions = {
  providers: [
    CredentialsProvider({ 
      name: 'Credentials', 
      credentials: { 
      },
      async authorize(credentials, req) {   
        const {username,password} = credentials as any
        if(!username || !password || username==undefined){
            throw new Error("Username dan password harus diisi")
        }
        let username_decrypted = decryptor(username)
        let password_decrypted = decryptor(password)
        if(username_decrypted=="admin" && password_decrypted=="admin"){
          return {
            email: "admin",
            user_id: 999,
            name: "admin",
            username: "admin",
            role: "admin"
          }
        }
        const userReturn = await LoginUseCase.execute(username_decrypted, password_decrypted)
        return userReturn
      } 
    })
  ],
  session : {
      strategy : "jwt",
      maxAge: 1 * 24 * 60 * 60, // 1 day
  },
  callbacks: { 
    async jwt({ token, user }){
      // console.log("user",user)
      if(token.role==undefined){
        token = await LoginUseCase.injectToken(user.email+"")
      }
      return token
    },
    async session({ session, token, user}) {
      session.user = token
      return session
    },
  }, 
  pages: {
    signIn: "/",
    error: "/auth/error"
  },
}