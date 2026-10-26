import { useRecoilState } from 'recoil';
import { tarefasAtom } from '../atoms/tarefasAtom';

function TodoItem({ tarefa }) {
  const [tarefas, setTarefas] = useRecoilState(tarefasAtom);

  function alternarConclusao() {
    setTarefas((atuais) =>
      atuais.map((item) =>
        item.id === tarefa.id ? { ...item, concluida: !item.concluida } : item,
      ),
    );
  }

  function removerTarefa() {
    setTarefas((atuais) => atuais.filter((item) => item.id !== tarefa.id));
  }

  return (
    <li className={`task-card ${tarefa.concluida ? 'completed' : ''}`}>
      <button
        type="button"
        className="check-button"
        onClick={alternarConclusao}
        aria-label={tarefa.concluida ? 'Marcar como pendente' : 'Marcar como concluída'}
        aria-pressed={tarefa.concluida}
      >
        {tarefa.concluida ? '✓' : ''}
      </button>
      <span className="task-title">{tarefa.titulo}</span>
      <button
        type="button"
        className="delete-button"
        onClick={removerTarefa}
        aria-label={`Excluir tarefa: ${tarefa.titulo}`}
        title="Excluir tarefa"
      >
        ×
      </button>
    </li>
  );
}

export default TodoItem;
