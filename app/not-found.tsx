"use client"
import Link from 'next/link'
import { Box, Heading, Text, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
export default function NotFound() {
  const router = useRouter()
  return (
      <Box textAlign="center" py={10} px={6}>
        <Heading
          display="inline-block"
          as="h2"
          size="4xl"
          bgGradient="linear(to-r, teal.400, teal.600)"
          backgroundClip="text">
          404
        </Heading>
        <Text fontSize="20px" mt={3} mb={2}>
          Data yang Anda cari tidak ditemukan
        </Text> 
        <Button
            colorScheme="teal"
            bgGradient="linear(to-r, teal.400, teal.500, teal.600)"
            color="white"
            mt={4}
            onClick={() => {
              router.back()
            }}
            variant="solid">
            Kembali ke halaman sebelumnya
          </Button>
        
      </Box>
  )
}