
import type { Book } from "../types/Book";
import { deleteBook, updateBookStatus } from "../services/api";

interface BookItemProps {
  book: Book;
  onBookDeleted: (id: string) => void;
  onBookUpdated: (book: Book) => void;
}

function BookItem({ book, onBookDeleted, onBookUpdated }: BookItemProps) {
  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      `Deseja realmente excluir "${book.title}"?`
    );

    if (!confirmDelete) return;

    try {
      await deleteBook(book._id);
      onBookDeleted(book._id);
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
      alert("Não foi possível excluir o livro. Tente novamente.");
    }
  };

  const handleToggleStatus = async () => {
    const newStatus =
      book.status === "Lido" ? "Não lido" : "Lido";

    try {
      await updateBookStatus(book, newStatus);

      onBookUpdated({
        ...book,
        status: newStatus,
      });
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
      alert("Não foi possível atualizar o status. Tente novamente.");
    }
  };

  return (
    <div>
      <h3>{book.title}</h3>
      <p>Autor: {book.author}</p>
      <p>Status: {book.status}</p>

      <button onClick={handleToggleStatus}>
        {book.status === "Lido"
          ? "Marcar como não lido"
          : "Marcar como lido"}
      </button>

      <button onClick={handleDelete}>
        Excluir livro
      </button>
    </div>
  );
}

export default BookItem;