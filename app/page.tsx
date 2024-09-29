"use client"
import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,  
  Button,
  Icon,
  useToast,
  Text
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getCsrfToken, getSession, signIn, signOut, useSession } from "next-auth/react"; 
import { TiSocialTwitter } from 'react-icons/ti';
import { encryptor } from '@/utils/Encrypt/encryptor';
import ErrorToast from '@/utils/ErrorToast';

const Login = () => {  
  const router = useRouter()
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [isLoading,setIsLoading] = useState(false)
  const [isWaiting, setIsWaiting] = useState<boolean>(false) 
  const toast = useToast()
  const loginAction = async()=>{
    try {
      let username_encrypted = encryptor(username)
      let password_encrypted = encryptor(password)
      setIsLoading(true)
      
      const result:any = await signIn("credentials", {
        username: username_encrypted,
        password: password_encrypted,
        redirect: false,
      });  
      if(result.status==200){ 
        setIsWaiting(true)
        const session = await getSession() 
        const user:any = session?.user 
        if(user){   
          if(user.role=="admin"){ 
            router.push('/admin/home')
          }
          else{
            router.push('/user/home')
          } 
        }
    } else{ 
      ErrorToast(toast,result.error) 
    }
    } catch (error) {
      
    }
    setIsLoading(false)
  }
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      {/* {isLoadingTodos && <div>Loading...</div>}
      {!isLoadingTodos && data && <div>{data.message}</div>}
      {error && <div>Error: {error.message}</div>} */} 
      <Flex
        flexDirection="column"
        bg={"white"}
        p={12}
        borderRadius={8}
        boxShadow="lg">
        
        <Flex justifyContent={"center"}>
        <Icon 
          mr="4"
          fontSize="45"
          color="blue.600" as={TiSocialTwitter}/></Flex>
        <Heading mb={6}>Tuwiter Log In</Heading>
        <Input
          placeholder="Username" 
          variant="filled"
          mb={3}
          onChange={(e)=>setUsername(e.target.value)}
        />
        <Input
          placeholder="Password"
          type="password"
          variant="filled"
          mb={6}
          onChange={(e)=>setPassword(e.target.value)}
        />
       {isWaiting && <Text mb={3}>Please wait...</Text>}
        <Button colorScheme="blue" mb={2} onClick={loginAction} isLoading={isLoading}>
          Log In
        </Button> 
        <Link href="/register">
          <Button colorScheme="blue" mb={8} w="full">
            To Register
          </Button> 
        </Link>
      </Flex>
    </Flex>
  );
};

export default Login;
