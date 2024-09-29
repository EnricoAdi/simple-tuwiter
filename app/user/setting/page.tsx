"use client"
import {
  Flex,
  Heading, 
  Button,
  Box, 
  Avatar,
  Text,
  Icon,
  useToast,
  Input,
  FormLabel,  
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaRegHeart, FaHeart  } from "react-icons/fa";
import { useSession } from 'next-auth/react';  
import { useEffect, useState } from 'react';
import { trpc } from '@/app/utils/trpc';
import SuccessToast from '@/utils/SuccessToast';
import { useRouter } from 'next/navigation';

const UserSetting = () => { 
  const { data:user, error:errorUser, isLoading:isLoadingUser } = trpc.user.getUserLoggedIn.useQuery(); 
  const toast = useToast()
  const { data: session } = useSession();
  const router = useRouter()
  const [username,setUsername] = useState("")
  const [picture,setPicture] = useState("")
  const editUser = trpc.user.updateProfile.useMutation({
    onSuccess:(data)=>{
      SuccessToast(toast,data.message)
      router.push('/user/home')
    }
  });
  const editUserAction = ()=>{
    editUser.mutate({username,picture})
  }
  useEffect(()=>{
    if(user){ 
      setUsername(user.username)
      setPicture(user.picture)
    }
  },[user])
  return (
     <Box p={2}> 
      <Heading size="md">Setting</Heading>  
      {isLoadingUser && <div>Loading...</div>}
      {errorUser && <div>{errorUser.message}</div>}
      {!isLoadingUser&& user && 
      <Box>
        <Flex justifyContent={"center"}> 
          <Avatar name={user.username} src={user.picture} size="xl" />
        </Flex>
        <FormLabel>Username</FormLabel>
        <Input placeholder='Username' defaultValue={user.username} onChange={(e)=>setUsername(e.target.value)}/>  
        <FormLabel mt={3}>Picture</FormLabel>
        <Input placeholder='Picture' defaultValue={user.picture} onChange={(e)=>setPicture(e.target.value)}/>  
        <Button colorScheme="blue" mt={5} w="full" onClick={editUserAction}>
          Save
        </Button> 
      </Box>}
     </Box>
  );
};

export default UserSetting;
