import type { Metadata } from "next"; 
import { ChakraProvider } from '@chakra-ui/react'
import "./globals.css";
import NextAuthProvider from "@/components/NextAuthProvider";
import TRPCProvider from "./provider/trpc";

export const metadata: Metadata = {
  title: "Tuwiter",
  description: "Simple tweet platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </head>
      <body>  
        <TRPCProvider>
          <ChakraProvider toastOptions={{ defaultOptions: { position: 'bottom' }}}>
           <NextAuthProvider>{children}</NextAuthProvider>
          </ChakraProvider>  
        </TRPCProvider>
      </body>
    </html>
  );
}
