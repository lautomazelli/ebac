import { useRecoilValue } from 'recoil';
import { tarefasAtom } from '../atoms/tarefasAtom';
import { tarefasFiltradasSelector } from '../selectors/tarefasFiltradasSelector';
import TodoItem from './TodoItem.jsx';

function TodoList() {
  const tarefas = useRecoilValue(tarefasAtom);
  const tarefasFiltradas = useRecoilValue(tarefasFiltradasSelector);

  if (tarefasFiltradas.length === 0) {
    const mensagem = tarefas.length === 0
      ? 'Sua lista está prontinha para receber novas ideias.'
      : 'Nenhuma tarefa aparece neste filtro.';

    return (
      <div className="empty-state">
        <span className="empty-illustration" aria-hidden="true">✿</span>
        <h3>Nada por aqui ainda</h3>
        <p>{mensagem}</p>
      </div>
    );
  }

  return (
    <ul className="task-list">
      {tarefasFiltradas.map((tarefa) => (
        <TodoItem key={tarefa.id} tarefa={tarefa} />
      ))}
    </ul>
  );
}

export default TodoList;
