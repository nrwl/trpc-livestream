import { z } from 'zod';
import { t } from './trpc';

export interface ToDo {
  id: string;
  title: string;
  completed: boolean;
}

const todos: Record<string, ToDo> = {};
let id = 0;

export const todosRouter = t.router({
  getAllTodos: t.procedure.query(() => Object.values(todos)),
  addTodo: t.procedure
    .input(z.object({ title: z.string() }))
    .mutation(({ input }) => {
      id++;
      todos[id] = {
        id: `${id}`,
        title: input.title,
        completed: false,
      };
      return todos[id];
    }),
  toggleComplete: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todo = todos[input.id];
      todo.completed = !todo.completed;
      return todo;
    }),
  deleteTodo: t.procedure
    .input(z.object({ id: z.string() }))
    .mutation(({ input }) => {
      const todo = todos[input.id];
      delete todos[input.id];
      return todo;
    }),
});
