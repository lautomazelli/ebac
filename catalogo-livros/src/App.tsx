
import { useState, useCallback } from "react";
import type { Book } from "./types/Book";
import BookForm from "./components/BookForm";
import BookList from "./components/BookList";
import "./App.css";

function App() {
  const [books, setBooks] = useState<Book[]>([]);

  const handleBookAdded = (book: Book) => {
    setBooks((previousBooks) => [...previousBooks, book]);
  };

  const handleBookDeleted = (id: string) => {
    setBooks((previousBooks) =>
      previousBooks.filter((book) => book._id !== id)
    );
  };

  const handleBookUpdated = (updatedBook: Book) => {
    setBooks((previousBooks) =>
      previousBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  const handleBooksLoaded = useCallback((loadedBooks: Book[]) => {
    setBooks(loadedBooks);
  }, []);

  return (
    <main>
      <h1>Meu Catálogo de Livros</h1>

      <BookForm onBookAdded={handleBookAdded} />

      <BookList
        books={books}
        onBookDeleted={handleBookDeleted}
        onBookUpdated={handleBookUpdated}
        onBooksLoaded={handleBooksLoaded}
      />

      <footer className="app-footer">
  <div className="footer-decoration"></div>

  <p>
    Desenvolvido por{" "}
    <strong>Laura Tomazelli de Castro</strong>
  </p>

  <span>
    © {new Date().getFullYear()} · Meu Catálogo de Livros
  </span>

  <small>Entre uns livros, uns códigos e umas canecas de café.</small>
</footer>

    </main>
  );
}

export default App;