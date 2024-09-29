import CryptoJS from "crypto-js";
export const decryptor = (idEncrypted:string):string=>{
    let idString = Buffer.from(idEncrypted, 'base64').toString()

    let id_decrypt = CryptoJS.AES.decrypt(
            idString,
            "vVrZa4nFJHiPjqoSHYDxtetBf9d+KEyMGrwx2lDEHY"
    ).toString(CryptoJS.enc.Utf8) 
     
    let id:string = JSON.parse(id_decrypt)
    return id
}
 