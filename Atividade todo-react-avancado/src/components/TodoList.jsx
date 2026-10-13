
import { useTodos } from '../context/TodoContext';
import TodoItem from './TodoItem';

function TodoList() {
  const { filteredTodos, todos } = useTodos();

  if (todos.length === 0) {
    return (
      <div className="todo-empty">
        <p className="todo-empty__title">Tudo começa com uma tarefa.</p>
        <p className="todo-empty__description">
          Adicione sua primeira tarefa usando o campo acima.
        </p>
      </div>
    );
  }

  if (filteredTodos.length === 0) {
    return (
      <p className="todo-empty__description">
        Não há tarefas nesta categoria.
      </p>
    );
  }

  return (
    <section className="todo-list">
      <ul className="todo-list__items">
        {filteredTodos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>

      <p className="todo-list__summary">
        {todos.filter((todo) => !todo.completed).length}{' '}
        {todos.filter((todo) => !todo.completed).length === 1
          ? 'tarefa pendente'
          : 'tarefas pendentes'}
      </p>
    </section>
  );
}

export default TodoList;