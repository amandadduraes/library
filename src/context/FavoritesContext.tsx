import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Favorite } from "@/interfaces/types";

interface FavoritesContextProps {
  favorites: Favorite[];
  addFavorite: (book: Favorite) => void;
  removeFavorite: (bookId: number) => void;
  setFavorites: (favorites: Favorite[]) => void;
}

const FavoritesContext = createContext<FavoritesContextProps | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  const addFavorite = (book: Favorite) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = [...prevFavorites, book];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const removeFavorite = (bookId: number) => {
    setFavorites((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((fav) => fav.id !== bookId);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, setFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) throw new Error("Não há favoritos");
  return context;
};
