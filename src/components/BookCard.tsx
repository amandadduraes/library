import React from "react";
import { Favorite } from "@/interfaces/types";
import Image from "next/image";

interface BookCardProps {
  favorite: Favorite;
  onFavorite: () => void;
  isFavorited: boolean;
  onReserve: () => Promise<void>;
  isReserved: boolean;
  disabled: boolean;
}

const BookCard: React.FC<BookCardProps> = ({
  favorite,
  onFavorite,
  isFavorited,
  onReserve,
  isReserved,
  disabled,
}) => {
  const { book } = favorite;

  return (
    <div className="p-4 border rounded">
      {book.imageUrl && (
        <Image
          src={book.imageUrl}
          alt={book.title}
          width={300}
          height={200}
          className="object-cover mb-4 rounded"
        />
      )}
      <h3 className="text-lg font-semibold">{book.title}</h3>
      <p>{book.description}</p>
      <button
        onClick={onFavorite}
        className={`mt-2 p-2 rounded ${
          isFavorited ? "bg-red-500" : "bg-green-500"
        } text-white`}
      >
        {isFavorited ? "Remover dos Favoritos" : "Adicionar aos Favoritos"}
      </button>
      {book.isAvailable ? (
        <button
          onClick={onReserve}
          className="mt-2 bg-blue-500 text-white p-2 rounded"
          disabled={disabled}
        >
          Reservar
        </button>
      ) : isReserved ? (
        <button
          onClick={onReserve}
          className="mt-2 bg-yellow-500 text-white p-2 rounded"
          disabled={disabled}
        >
          Devolver
        </button>
      ) : (
        <span className="mt-2 text-red-500">Indisponível</span>
      )}
    </div>
  );
};

export default BookCard;
