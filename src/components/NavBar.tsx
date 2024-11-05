import React from "react";
import Link from "next/link";

interface NavBarProps {
  onLogout: () => void;
  isLoggedIn: boolean;
  username?: string;
  favoritesCount: number;
  onFavoritesClick: () => void;
}

const NavBar: React.FC<NavBarProps> = ({
  onLogout,
  isLoggedIn,
  username,
  favoritesCount,
  onFavoritesClick,
}) => {
  return (
    <nav className="flex items-center justify-between p-4 bg-gray-800 text-white">
      <Link href="/books">
        <h1 className="text-lg font-bold cursor-pointer">Marie Livraria</h1>
      </Link>
      <div className="flex items-center space-x-4">
        <button onClick={onFavoritesClick} className="flex items-center">
          Favoritos: {favoritesCount}
        </button>
        {isLoggedIn ? (
          <>
            <span>Bem-vindo, {username}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button onClick={onLogout}>Login</button>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
