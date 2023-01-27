import { TodoTrpcRouter } from '@nx-trpc-demo/todo-trpc-server';
import { inferRouterOutputs } from '@trpc/server';
import { trpc } from './trpc';

export default function TodoList() {
  const { data } = trpc.todos.getAllTodos.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  return (
    <ul>
      {data?.map((item) => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  );
}

type TodoItemProps =
  inferRouterOutputs<TodoTrpcRouter>['todos']['getAllTodos'][0];

function TodoItem({ completed, title, id }: TodoItemProps) {
  const utils = trpc.useContext();
  const { mutate: deleteTodoItem } = trpc.todos.deleteTodo.useMutation({
    onSuccess: (deleteItem) => {
      utils.todos.getAllTodos.setData(undefined, (old) =>
        old?.filter((item) => item.id !== deleteItem.id)
      );
    },
  });
  const { mutate: toggle } = trpc.todos.toggleComplete.useMutation({
    onSuccess: (newItem) => {
      utils.todos.getAllTodos.setData(undefined, (old) => {
        if (!old) return [newItem];
        return old.map((item) => {
          if (item.id === newItem.id) {
            return newItem;
          }
          return item;
        });
      });
    },
  });

  return (
    <li>
      <input
        type="checkbox"
        defaultChecked={completed}
        onClick={() => toggle({ id })}
        id={`checkbox-${id}`}
      />
      <label htmlFor={`checkbox-${id}`}>{title}</label>
      <button
        onClick={() => {
          deleteTodoItem({ id });
        }}
      >
        Delete
      </button>
    </li>
  );
}
