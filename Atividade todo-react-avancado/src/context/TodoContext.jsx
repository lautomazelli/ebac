
import { createContext, useContext, useMemo, useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';

const TodoContext = createContext();

export function TodoProvider({ children }) {
  const [todos, setTodos] = useLocalStorage('tarefas', []);
  const [filter, setFilter] = useState('all');

  function addTodo(text) {
    const newTodo = {
      id: crypto.randomUUID(),
      text: text.trim(),
      completed: false,
    };

    setTodos((currentTodos) => [...currentTodos, newTodo]);
  }

  function toggleTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  }

  function removeTodo(id) {
    setTodos((currentTodos) =>
      currentTodos.filter((todo) => todo.id !== id)
    );
  }

  const filteredTodos = useMemo(() => {
    if (filter === 'completed') {
      return todos.filter((todo) => todo.completed);
    }

    if (filter === 'pending') {
      return todos.filter((todo) => !todo.completed);
    }

    return todos;
  }, [todos, filter]);

  const value = {
    todos,
    filteredTodos,
    filter,
    setFilter,
    addTodo,
    toggleTodo,
    removeTodo,
  };

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
}

export function useTodos() {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('useTodos deve ser usado dentro de TodoProvider.');
  }

  return context;
}