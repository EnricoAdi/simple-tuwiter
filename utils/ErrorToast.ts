import { CreateToastFnReturn } from "@chakra-ui/react"

/**
 * This function is used to display an error toast using chakraui toast
 * @param toast 
 * @param error 
 */
const ErrorToast = (toast:CreateToastFnReturn, error:any)=>{
  let message = "Error" 
  // if(error.err && error.err.messages){
  //   message = ""
  //   for (let i = 0; i < error.err.messages.length; i++) {
  //     if(i == error.err.messages.length-1){
  //       message += error.err.messages[i]
  //     }else{
  //       message += error.err.messages[i] + ", "
  //     }
  //   }
  // }
  if(typeof(error)==="string"){
    message = error
  } 
  const resultToast = toast({
    title: "Error",
    description: message,
    position: 'bottom-right',
    isClosable: true,
    status: "error"
  })
}
export default ErrorToast