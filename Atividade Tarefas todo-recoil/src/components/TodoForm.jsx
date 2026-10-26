import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { tarefasAtom } from '../atoms/tarefasAtom';

function TodoForm() {
  const [texto, setTexto] = useState('');
  const [tarefas, setTarefas] = useRecoilState(tarefasAtom);

  function adicionarTarefa(event) {
    event.preventDefault();
    const titulo = texto.trim();

    if (!titulo) return;

    const novaTarefa = {
      id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
      titulo,
      concluida: false,
    };

    setTarefas((tarefasAtuais) => [novaTarefa, ...tarefasAtuais]);
    setTexto('');
  }

  return (
    <form className="todo-form" onSubmit={adicionarTarefa}>
      <label className="sr-only" htmlFor="nova-tarefa">Escreva uma tarefa</label>
      <input
        id="nova-tarefa"
        type="text"
        value={texto}
        onChange={(event) => setTexto(event.target.value)}
        placeholder="O que você quer realizar?"
        maxLength={120}
      />
      <button type="submit" className="add-button" disabled={!texto.trim()}>
        <span aria-hidden="true">＋</span> Adicionar
      </button>
    </form>
  );
}

export default TodoForm;
