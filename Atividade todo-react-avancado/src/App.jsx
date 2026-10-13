import TodoForm from './components/TodoForm';
import TodoFilters from './components/TodoFilters';
import TodoList from './components/TodoList';
import './App.css';

function App() {
return ( <main className="app"> <header className="app__header"> <p className="app__eyebrow">ORGANIZE SEU DIA</p>

```
    <h1 className="app__title">Minhas tarefas</h1>

    <p className="app__description">
      Um passo de cada vez. Organize suas prioridades e acompanhe
      seu progresso.
    </p>
  </header>

  <section className="todo" aria-label="Lista de tarefas">
    <TodoForm />
    <TodoFilters />
    <TodoList />
  </section>
</main>
```

);
}

export default App;
