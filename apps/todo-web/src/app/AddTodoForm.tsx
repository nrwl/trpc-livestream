import { useState } from 'react';
import { trpc } from './trpc';

export default function AddTodoForm() {
  const utils = trpc.useContext();
  const [title, setNewTodoName] = useState('');
  const { mutate, isLoading } = trpc.todos.addTodo.useMutation({
    onSuccess: (todoItem) => {
      // utils.todos.getAllTodos.invalidate();
      utils.todos.getAllTodos.setData(undefined, (old) => {
        if (!old) return [todoItem];
        return [...old, todoItem];
      });
    },
  });

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    mutate({ title });
    setNewTodoName('');
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        onChange={(event) => {
          setNewTodoName(event.target.value);
        }}
        value={title}
      />

      <button type="submit">Add</button>
    </form>
  );
}
