export const getFileExtension = (filename:string):string=>{
    return filename.substring(filename.lastIndexOf('.') + 1).toLowerCase()
}
 