"use client"
import {
  Flex,
  Heading, 
  Button,
  Box, 
  Avatar,
  Text,
  Icon,  
} from '@chakra-ui/react';
import Link from 'next/link';
import { FaRegHeart, FaHeart, FaTrash  } from "react-icons/fa";
import { useSession } from 'next-auth/react';  
import { useState } from 'react';
import { trpc } from '@/app/utils/trpc';

const UserHome = () => { 
  const fetchTweets = trpc.tweet.fetchTweets.useQuery(undefined, { refetchOnMount: true }); 
  const { data: session } = useSession();
  const toggleLike = trpc.like.toggleLike.useMutation({
    onSettled:()=>{
      fetchTweets.refetch()
    }
  });
  const deleteTweet = trpc.tweet.deleteTweet.useMutation({
    onSettled:()=>{
      fetchTweets.refetch()
    }
  });
  const deleteTweetAction =  (tweet_id:number) => {
    deleteTweet.mutate({tweet_id})
  } 
  const toggleLikeAction =  (tweet_id:number) => {
    toggleLike.mutate({tweet_id})
  }
  return (
     <Box p={2}> 
      <Heading size="md" >Welcome, {session?.user?.name}!</Heading> 
      <Link href="/user/tweet"><Button colorScheme='blue' rounded={"3xl"} mt={3}>Tweet!</Button> </Link>
      {fetchTweets.isLoading && <div>Loading...</div>}
      {fetchTweets.error && <div>Error: {fetchTweets.error.message}</div>}
      {fetchTweets.data && fetchTweets.data.map((tweet, index) => {
        return <Box mt={3} key={tweet.tweet_id+"_"+index} className='border-gray-400 border-2 p-2 rounded-md'> 
        <Flex gap={3} mb={2}>
          <Avatar size="sm" src={tweet.picture}/>
          <Heading size="md">{tweet.username}</Heading>
        </Flex>
        <Text>{tweet.title}</Text>
        <Text>{tweet.content}</Text>
        <Flex mt={3} gap={2}>
          {tweet.isLike ? <Icon as={FaHeart} color="red" my={"auto"} onClick={()=>toggleLikeAction(tweet.tweet_id)}/> : <Icon as={FaRegHeart} my={"auto"} onClick={()=>toggleLikeAction(tweet.tweet_id)}/>}
          <Text>{tweet.likes} Likes</Text>
          {tweet.user_id==session?.user.user_id && <Icon as={FaTrash} color="red.500" my={"auto"} ml={4} onClick={()=>deleteTweetAction(tweet.tweet_id)}/> } 
        </Flex>
      </Box> 
      })}
     </Box>
  );
};

export default UserHome;
