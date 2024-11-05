import React, { useEffect, useState } from "react";
import NavBar from "@/components/NavBar";
import { trpc } from "@/app/utils/trpc";
import BookCard from "@/components/BookCard";
import { useAuth } from "@/context/AuthContext";
import { useFavorites } from "@/context/FavoritesContext";
import { useBooks } from "@/context/BooksContext";
import { Book, Favorite } from "@/interfaces/types";
import { withAuth } from "@/app/utils/withAuth";
import { useRouter } from "next/router";

const Home = () => {
  const { data: books = [], isLoading, error } = trpc.book.getAll.useQuery();
  const { isLoggedIn, user, logout } = useAuth();
  const { favorites, addFavorite, removeFavorite, setFavorites } =
    useFavorites();
  const { setBooks } = useBooks();
  const router = useRouter();

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const updateBookMutation = trpc.book.update.useMutation();

  const { data: userFavorites } = trpc.favorite.getByUserId.useQuery(
    { userId: user ? user.id : 0 },
    {
      enabled: !!user,
    }
  );

  useEffect(() => {
    if (userFavorites) {
      setFavorites(userFavorites);
    }
  }, [userFavorites, setFavorites]);

  useEffect(() => {
    if (books.length) {
      setBooks(books);
    }
  }, [books, setBooks]);

  const handleFavoriteToggle = (book: Book) => {
    const favorite: Favorite = {
      id: Math.random(),
      userId: user ? user.id : 0,
      bookId: book.id,
      book,
    };

    if (favorites.some((fav) => fav.bookId === book.id)) {
      removeFavorite(favorite.bookId);
    } else {
      addFavorite(favorite);
    }
  };

  const handleReserve = async (book: Book) => {
    if (book.isAvailable) {
      const updatedBook = {
        reservedBy: user ? String(user.id) : null,
        isAvailable: false,
      };
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, ...updatedBook } : b))
      );
      setMessage("Livro reservado com sucesso!");
      setLoading(true);

      try {
        await updateBookMutation.mutateAsync({
          id: book.id,
          data: updatedBook,
        });
      } catch (error) {
        console.error("Erro ao reservar o livro:", error);
        setMessage("Erro ao reservar o livro.");
        setBooks((prev) =>
          prev.map((b) =>
            b.id === book.id ? { ...b, isAvailable: true, reservedBy: null } : b
          )
        );
      } finally {
        setLoading(false);
        setTimeout(() => setMessage(""), 3000);
      }
    } else {
      setMessage("Este livro já está reservado.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleReturn = async (book: Book) => {
    if (book.reservedBy === String(user?.id)) {
      const updatedBook = { reservedBy: null, isAvailable: true };
      setBooks((prev) =>
        prev.map((b) => (b.id === book.id ? { ...b, ...updatedBook } : b))
      );
      setMessage("Livro devolvido com sucesso!");
      setLoading(true);

      try {
        await updateBookMutation.mutateAsync({
          id: book.id,
          data: updatedBook,
        });
      } catch (error) {
        console.error("Erro ao devolver o livro:", error);
        setMessage("Erro ao devolver o livro.");
      } finally {
        setLoading(false);
        setTimeout(() => setMessage(""), 3000);
      }
    } else {
      setMessage("Você não pode devolver este livro.");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading books: {error.message}</div>;

  return (
    <div>
      <NavBar
        onLogout={logout}
        isLoggedIn={isLoggedIn}
        username={user?.username}
        favoritesCount={favorites.length}
        onFavoritesClick={() => router.push("/favorites")}
      />
      {message && (
        <div className="p-4 bg-green-100 border border-green-400 text-green-700 rounded mb-4">
          {message}
        </div>
      )}
      <div className="grid grid-cols-3 gap-4 p-4">
        {books.map((book: Book) => (
          <BookCard
            key={book.id}
            favorite={{
              id: book.id,
              userId: user ? user.id : 0,
              bookId: book.id,
              book,
            }}
            onFavorite={() => handleFavoriteToggle(book)}
            isFavorited={favorites.some((fav) => fav.bookId === book.id)}
            onReserve={() =>
              book.isAvailable ? handleReserve(book) : handleReturn(book)
            }
            isReserved={book.reservedBy === String(user?.id)}
            disabled={loading}
          />
        ))}
      </div>
    </div>
  );
};

export default withAuth(Home);
