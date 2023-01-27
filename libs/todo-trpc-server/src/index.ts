import { todosRouter } from './lib/todos-router';
import { t } from './lib/trpc';

export const trpcRouter = t.router({
  todos: todosRouter,
});

export type TodoTrpcRouter = typeof trpcRouter;
