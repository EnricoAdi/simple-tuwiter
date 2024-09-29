import UserRepository from "@/app/api/repository/UserRepository"
const bcrypt = require('bcrypt')

/**
 * Use case ini digunakan untuk melakukan aksi login ke dalam sistem. Proses dari use case ini dimulai dengan melakukan pengecekan apakah email yang digunakan sudah terdaftar atau belum. Jika belum terdaftar, maka akan muncul error. Jika sudah terdaftar, maka akan dilakukan pengecekan apakah password yang digunakan sudah benar atau belum. Jika benar, maka akan mengembalikan data user. Jika salah, maka akan muncul error.
 */
const LoginUseCase = {
  async execute(username:string, password:string){
    let cekUser = await UserRepository.get(username)
    if(!cekUser){ 
        throw new Error("Username tidak ditemukan")
    } 
    const cekPass = await bcrypt.compare(password, cekUser?.password) 
    if(cekPass){ 
      cekUser.password = "" 
      const user = {
        email: cekUser.username,
        user_id: cekUser.user_id,
        username: cekUser.username
      }
        const userReturn = JSON.parse(JSON.stringify(user))
        return {...userReturn,role:"user"}
    }else{
        throw new Error("Password salah")
    }
  },
  async injectToken(username:string){
    if(username=="admin"){
      return {
        email: "admin",
        user_id: 999,
        name: "admin",
        username: "admin",
        role: "admin"
      }
    }
    let userDb = await UserRepository.get(username) 
    if(userDb){
      return {
        email: userDb.username,
        user_id: userDb.user_id,
        name: userDb.username,
        username: userDb.username,
        role:"user"
      }
    }
    return {}
  }
}
export default LoginUseCase