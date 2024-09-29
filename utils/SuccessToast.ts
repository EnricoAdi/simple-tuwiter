import { CreateToastFnReturn } from "@chakra-ui/react"

/**
 * This function is used to display an success toast using chakraui toast
 * @param toast 
 * @param result 
 */
const SuccessToast = (toast:CreateToastFnReturn, result:any)=>{
  let message = "Success"
  if(result.message){
    message = result.message
  }
  else if(typeof(result)==="string"){
    message = result
  }
  const resultToast = toast({
    title: "Success",
    description: message,
    position: 'bottom-right',
    isClosable: true,
    status: "success"
  })
}
export default SuccessToast