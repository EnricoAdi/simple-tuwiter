"use client"
import { trpc } from '@/app/utils/trpc';
import SuccessToast from '@/utils/SuccessToast';
import {
  Flex,
  Heading,
  Input,
  Button,
  Box,
  Textarea,
  useToast,  
} from '@chakra-ui/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const UserTweet = () => {
  const [title,setTitle] = useState("")
  const [content,setContent] = useState("")
  const toast = useToast()
  const router = useRouter()
  const createTweet = trpc.tweet.createTweet.useMutation({
    onSuccess:(data)=>{
      SuccessToast(toast,data.message)
      router.push('/user/home')
    }
  });
  const createTweetAction = ()=>{
    createTweet.mutate({title,content})
  }
  return (
     <Box p={2}> 
        <Heading size="md" >Make new tweet!</Heading>
        <Input placeholder='Whats happening?' mt={3} onChange={(e)=>setTitle(e.target.value)}/>
        <Textarea placeholder='Share your thoughts' mt={3} onChange={(e)=>setContent(e.target.value)}/>
        <Flex mt={3} justifyContent={"flex-end"}><Button colorScheme='blue' rounded={"3xl"} isLoading={createTweet.isLoading} onClick={createTweetAction}>Tweet</Button></Flex>
        
     </Box>
  );
};

export default UserTweet;
