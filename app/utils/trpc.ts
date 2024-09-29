import { createTRPCReact } from '@trpc/react-query';
import type { AppRouter } from '../server/trpc';

// Create the tRPC client instance
export const trpc = createTRPCReact<AppRouter>();