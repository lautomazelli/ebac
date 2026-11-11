
import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { getBooks } from "../services/api";
import BookItem from "./BookItem";

interface BookListProps {
  books: Book[];
  onBookDeleted: (id: string) => void;
  onBookUpdated: (book: Book) => void;
  onBooksLoaded: (books: Book[]) => void;
}

function BookList({
  books,
  onBookDeleted,
  onBookUpdated,
  onBooksLoaded,
}: BookListProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        onBooksLoaded(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
        setError("Não foi possível carregar os livros.");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, [onBooksLoaded]);

  if (loading) return <p>Carregando livros...</p>;
  if (error) return <p role="alert">{error}</p>;

  const readBooks = books.filter((book) => book.status === "Lido");
  const unreadBooks = books.filter((book) => book.status === "Não lido");

  const totalBooks = books.length;
  const readCount = readBooks.length;
  const unreadCount = unreadBooks.length;

  const progress =
    totalBooks === 0 ? 0 : Math.round((readCount / totalBooks) * 100);

  return (
    <section className="library-section">
      <h2>Minha biblioteca</h2>

      <div className="reading-summary">
        <div className="summary-heading">
          <div>
            <span className="summary-label">Meu progresso de leitura</span>
            <p className="summary-total">
              {readCount} de {totalBooks} livros lidos
            </p>
          </div>

          <strong className="summary-percentage">{progress}%</strong>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Progresso de leitura"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>

        <div className="summary-counts">
          <span>{readCount} lidos</span>
          <span>{unreadCount} não lidos</span>
        </div>
      </div>

      <div className="reading-boards">
        <div className="reading-board reading-board--read">
          <div className="board-heading">
            <div>
              <h3>✓ Livros lidos</h3>
              <p>Suas leituras concluídas</p>
            </div>
            <span className="board-count">{readCount}</span>
          </div>

          <div className="book-grid">
            {readBooks.length === 0 ? (
              <p className="empty-message">
                Nenhum livro lido ainda. Suas próximas conquistas começam aqui!
              </p>
            ) : (
              readBooks.map((book) => (
                <BookItem
                  key={book._id}
                  book={book}
                  onBookDeleted={onBookDeleted}
                  onBookUpdated={onBookUpdated}
                />
              ))
            )}
          </div>
        </div>

        <div className="reading-board reading-board--unread">
          <div className="board-heading">
            <div>
              <h3>○ Livros não lidos</h3>
              <p>Na sua fila de leitura</p>
            </div>
            <span className="board-count">{unreadCount}</span>
          </div>

          <div className="book-grid">
            {unreadBooks.length === 0 ? (
              <p className="empty-message">
                Sua fila está vazia. Que tal adicionar uma nova leitura?
              </p>
            ) : (
              unreadBooks.map((book) => (
                <BookItem
                  key={book._id}
                  book={book}
                  onBookDeleted={onBookDeleted}
                  onBookUpdated={onBookUpdated}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default BookList;