import axios from "axios";
import type { Book, BookStatus, NewBook } from "../types/Book";


const api = axios.create({
  baseURL: "https://crudcrud.com/api/165560c052e54dddab1f6f409b9d69f4/books",
});


export const getBooks = async (): Promise<Book[]> => {
  const response = await api.get<Book[]>("/");
  return response.data;
};

export const createBook = async (book: NewBook): Promise<Book> => {
  const response = await api.post<Book>("/", book);
  return response.data;
};

export const deleteBook = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};

export const updateBookStatus = async (
  book: Book,
  status: BookStatus
): Promise<void> => {
  await api.put(`/${book._id}`, {
    title: book.title,
    author: book.author,
    status: status,
  });
};