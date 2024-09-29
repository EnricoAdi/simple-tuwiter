"use client"
import React from 'react'
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
import { FaTrash, FaHeart  } from "react-icons/fa";
import { trpc } from '@/app/utils/trpc';

const AdminHome = () => { 
  const fetchTweets = trpc.tweet.fetchTweets.useQuery(undefined, { refetchOnMount: true });
  const deleteTweet = trpc.tweet.deleteTweet.useMutation({
    onSettled:()=>{
      fetchTweets.refetch()
    }
  });
  const deleteTweetAction =  (tweet_id:number) => {
    deleteTweet.mutate({tweet_id})
  } 
  return (
    <Box p={2}> 
    <Heading size="md" >Welcome, Admin!</Heading> 
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
          <Icon as={FaHeart} color="red" my={"auto"} /> 
          <Text>{tweet.likes} Likes</Text>
          
          <Icon as={FaTrash} color="red.500" my={"auto"} ml={4} onClick={()=>deleteTweetAction(tweet.tweet_id)}/> 
        </Flex>
      </Box> 
      })}
    </Box>
  )
}

export default AdminHome