import { useRecoilState } from 'recoil';
import { filtroAtom } from '../atoms/filtroAtom';

const opcoes = [
  { valor: 'todas', texto: 'Todas' },
  { valor: 'pendentes', texto: 'Pendentes' },
  { valor: 'concluidas', texto: 'Concluídas' },
];

function TodoFilters() {
  const [filtro, setFiltro] = useRecoilState(filtroAtom);

  return (
    <div className="filters" role="group" aria-label="Filtrar tarefas">
      {opcoes.map((opcao) => (
        <button
          type="button"
          key={opcao.valor}
          className={`filter-button ${filtro === opcao.valor ? 'active' : ''}`}
          aria-pressed={filtro === opcao.valor}
          onClick={() => setFiltro(opcao.valor)}
        >
          {opcao.texto}
        </button>
      ))}
    </div>
  );
}

export default TodoFilters;
