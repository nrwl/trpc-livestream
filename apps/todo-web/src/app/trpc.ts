import { createTRPCReact } from '@trpc/react-query';
import { TodoTrpcRouter, trpcRouter } from '@nx-trpc-demo/todo-trpc-server';

export const trpc = createTRPCReact<TodoTrpcRouter>();
