// src/types.ts (opcional, para reutilizar o tipo em outras partes do projeto)
export interface Book {
  id: number;
  title: string;
  description: string;
  author: string;
  imageUrl: string;
  isAvailable: boolean;
  reservedBy: string | null
}

export interface Favorite {
  id: number;
  userId: number;
  bookId: number;
  book: Book;
}