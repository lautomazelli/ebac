
import { useTodos } from '../context/TodoContext';

const filters = [
  { label: 'Todas', value: 'all' },
  { label: 'Pendentes', value: 'pending' },
  { label: 'Concluídas', value: 'completed' },
];

function TodoFilters() {
  const { filter, setFilter } = useTodos();

  return (
    <div className="todo-filters" aria-label="Filtrar tarefas">
      {filters.map((item) => (
        <button
          key={item.value}
          type="button"
          className={`todo-filters__button ${
            filter === item.value ? 'todo-filters__button--active' : ''
          }`}
          aria-pressed={filter === item.value}
          onClick={() => setFilter(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export default TodoFilters;