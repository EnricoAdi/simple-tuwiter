import ErrorToast from "@/utils/ErrorToast"
import SuccessToast from "@/utils/SuccessToast"
import { CreateToastFnReturn } from "@chakra-ui/react"

/**
 *  Function ini digunakan untuk melakukan HTTP request, lalu secara otomatis menampilkan pesan berhasil atau error. Hook ini juga dapat diubah apabila ingin mengembalikan sebuah nilai pada halaman yang memanggil hook ini.
 * @param request 
 * @param toast 
 * @param successCallback void
 * @param errorCallback void
 * @param withResponseData boolean
 * @param customSuccessMessage string
 * @param withMessage boolean
 */
async function ServiceHelper(
    request: Promise<bundleInputType>,
    toast: CreateToastFnReturn,
    successCallback?: ()=>void,
    errorCallback?: ()=>void,
    withResponseData?: boolean,
    customSuccessMessage?: string,
    withMessage: boolean = true
){
    try {
        const result = await request
        if(withMessage){
            if(customSuccessMessage) SuccessToast(toast, customSuccessMessage)
            else SuccessToast(toast, result.message)
        }
        if(successCallback) successCallback()
        if(withResponseData) return result.result
    } catch (error:any) {  
        ErrorToast(toast, error)
        if(errorCallback) errorCallback()
    }
}
export default ServiceHelper