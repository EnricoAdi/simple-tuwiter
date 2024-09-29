"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import React, { useState } from "react";

import { trpc } from "../utils/trpc";
import { useToast } from "@chakra-ui/react";
import SuccessToast from "@/utils/SuccessToast";
import ErrorToast from "@/utils/ErrorToast";

export default function TRPCProvider({ children }: { children: React.ReactNode }) {
  const toast = useToast();
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions:{
      mutations:{
        onError:(error:any)=>{ 
          let msg = "Error"
          try { 
            const msgObj = JSON.parse(error.message)   
            msg = msgObj[0].message
          } catch (err) {
            msg = error.message
          } finally{ 
            ErrorToast(toast,msg)
          }
        }
      }
    } 
  }));
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:3000/api/trpc",
        }),
      ],
    })
  );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
}