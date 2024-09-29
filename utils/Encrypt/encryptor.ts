import CryptoJS from "crypto-js";
export const encryptor = (id:string):string=>{
    const encrypted = CryptoJS.AES.encrypt(
        JSON.stringify(id),
        "vVrZa4nFJHiPjqoSHYDxtetBf9d+KEyMGrwx2lDEHY"
    ).toString();

    let encryptBuffer = Buffer.from(encrypted).toString('base64') 
    return encryptBuffer
}
 