
import { useState } from 'react';
import { useTodos } from '../context/TodoContext';

function TodoForm() {
  const [text, setText] = useState('');
  const { addTodo } = useTodos();

  function handleSubmit(event) {
    event.preventDefault();

    if (!text.trim()) {
      return;
    }

    addTodo(text);
    setText('');
  }

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <label className="todo-form__label" htmlFor="todo-input">
        O que você precisa fazer?
      </label>

      <div className="todo-form__field">
        <input
          id="todo-input"
          className="todo-form__input"
          type="text"
          placeholder="Ex.: Estudar React"
          value={text}
          onChange={(event) => setText(event.target.value)}
        />

        <button className="todo-form__button" type="submit">
          Adicionar
        </button>
      </div>
    </form>
  );
}

export default TodoForm;