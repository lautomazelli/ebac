import { useRecoilValue } from 'recoil';
import { tarefasAtom } from './atoms/tarefasAtom';
import TodoForm from './components/TodoForm.jsx';
import TodoFilters from './components/TodoFilters.jsx';
import TodoList from './components/TodoList.jsx';
import './App.css';

function App() {
  const tarefas = useRecoilValue(tarefasAtom);
  const concluidas = tarefas.filter((tarefa) => tarefa.concluida).length;
  const pendentes = tarefas.length - concluidas;
  const progresso = tarefas.length ? Math.round((concluidas / tarefas.length) * 100) : 0;

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Todo Recoil início">
          <span className="brand-mark">✳</span>
          <span>little <strong>by little</strong></span>
        </a>
        <span className="topbar-note">seu espaço de foco</span>
      </header>

      <section className="welcome">
        <div className="welcome-copy">
          <span className="eyebrow">UM PASSO DE CADA VEZ</span>
          <h1>Organize seu dia<br /><em>com leveza.</em></h1>
          <p>Pequenas tarefas também constroem grandes caminhos.<br className="desktop-break" /> Vamos cuidar do que importa hoje?</p>
        </div>
        <div className="sun-art" aria-hidden="true">
          <span className="sun">☼</span>
          <span className="sun-leaf leaf-one">✦</span>
          <span className="sun-leaf leaf-two">✧</span>
        </div>
      </section>

      <section className="workspace" aria-label="Gerenciador de tarefas">
        <div className="workspace-heading">
          <div>
            <span className="eyebrow">SUA LISTA</span>
            <h2>Minhas tarefas <span className="count-pill">{tarefas.length}</span></h2>
          </div>
          <span className="date-note">feito no seu ritmo ♡</span>
        </div>

        <TodoForm />

        <div className="list-toolbar">
          <TodoFilters />
          <span className="pending-count">{pendentes} {pendentes === 1 ? 'pendente' : 'pendentes'}</span>
        </div>

        <TodoList />

        <div className="progress-panel">
          <div className="progress-label">
            <span>Seu progresso de hoje</span>
            <strong>{progresso}%</strong>
          </div>
          <div className="progress-track" role="progressbar" aria-valuenow={progresso} aria-valuemin="0" aria-valuemax="100" aria-label="Progresso das tarefas">
            <span style={{ width: `${progresso}%` }} />
          </div>
          <p>{tarefas.length === 0 ? 'Tudo começa com uma primeira tarefa.' : concluidas === tarefas.length ? 'Que orgulho! Você concluiu tudo. ✨' : 'Continue assim — cada passo conta.'}</p>
        </div>
      </section>

      <footer className="page-footer">
        <span>feito com calma, carinho e um pouquinho de código</span>
        <span aria-hidden="true">✿</span>
      </footer>
    </main>
  );
}

export default App;
