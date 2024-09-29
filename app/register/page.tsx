"use client" 
import {
  Flex,
  Heading,
  Input,
  Button,
  Icon,
  useToast,  
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { TiSocialTwitter } from "react-icons/ti";
import { trpc } from '../utils/trpc';
import { TRPCClientError } from '@trpc/client';
import SuccessToast from '@/utils/SuccessToast';

const Register = () => {  
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()
  const toast = useToast()
  const addUser = trpc.user.registerUser.useMutation({
    onSuccess:(data)=>{
      SuccessToast(toast,data.message)
    }
  }); 
  const registerAction = async()=>{
   addUser.mutate({username,password,confirmPassword})
  }
  return (
    <Flex h="100vh" alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={"white"}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Flex justifyContent={"center"}>
        <Icon 
          mr="4"
          fontSize="45"
          color="blue.600" as={TiSocialTwitter}/></Flex>
        <Heading mb={6}>Tuwiter Register</Heading>
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
        <Input
          placeholder="Confirm Password"
          type="password"
          variant="filled"
          mb={6}
          onChange={(e)=>setConfirmPassword(e.target.value)}
        />
        <Button colorScheme="blue" mb={2} onClick={registerAction} isLoading={addUser.isLoading}>
          Register
        </Button> 
        <Link href="/">
          <Button colorScheme="blue" mb={8} w="full">
            To Login
          </Button> 
        </Link>
      </Flex>
    </Flex>
  );
};

export default Register;
