
import { useState, type ChangeEvent, type FormEvent } from "react";
import { createBook } from "../services/api";
import type { Book, BookStatus, NewBook } from "../types/Book";

interface BookFormProps {
  onBookAdded: (book: Book) => void;
}

function BookForm({ onBookAdded }: BookFormProps) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [status, setStatus] = useState<BookStatus>("Não lido");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event: ChangeEvent<HTMLInputElement>) => {
    setAuthor(event.target.value);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setStatus(event.target.value as BookStatus);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    const newBook: NewBook = {
      title,
      author,
      status,
    };

    try {
      const createdBook = await createBook(newBook);

      onBookAdded(createdBook);

      setTitle("");
      setAuthor("");
      setStatus("Não lido");
    } catch (error) {
      console.error("Erro ao cadastrar livro:", error);
      setError("Não foi possível cadastrar o livro. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Adicionar livro</h2>

      <div>
        <label htmlFor="title">Título:</label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={handleTitleChange}
          placeholder="Nome do livro"
          required
        />
      </div>

      <div>
        <label htmlFor="author">Autor:</label>
        <input
          id="author"
          type="text"
          value={author}
          onChange={handleAuthorChange}
          placeholder="Nome do autor"
          required
        />
      </div>

      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={handleStatusChange}
        >
          <option value="Não lido">Não lido</option>
          <option value="Lido">Lido</option>
        </select>
      </div>

      <button type="submit" disabled={loading}>
        {loading ? "Cadastrando..." : "Adicionar livro"}
      </button>

      {error && <p role="alert">{error}</p>}
    </form>
  );
}

export default BookForm;