import { CreateToastFnReturn } from "@chakra-ui/react"

/**
 * This function is used to display an warning toast (yellow) using chakraui toast
 * @param toast 
 * @param result 
 */
const WarningToast = (toast:CreateToastFnReturn, message:any)=>{
  const resultToast = toast({
    title: "Peringatan",
    description: message,
    position: 'bottom-right',
    isClosable: true,
    status: "warning"
  })
}
export default WarningToast