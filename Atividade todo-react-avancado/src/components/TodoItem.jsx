
import { memo } from 'react';
import { useTodos } from '../context/TodoContext';

function TodoItem({ todo }) {
  const { toggleTodo, removeTodo } = useTodos();

  return (
    <li className="todo-item">
      <label className="todo-item__content">
        <input
          className="todo-item__checkbox"
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
        />

        <span
          className={`todo-item__text ${
            todo.completed ? 'todo-item__text--completed' : ''
          }`}
        >
          {todo.text}
        </span>
      </label>

      <button
        className="todo-item__delete"
        type="button"
        aria-label={`Remover tarefa: ${todo.text}`}
        onClick={() => removeTodo(todo.id)}
      >
        Excluir
      </button>
    </li>
  );
}

export default memo(TodoItem);