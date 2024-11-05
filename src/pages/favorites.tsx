import { useFavorites } from "@/context/FavoritesContext";
import NavBar from "@/components/NavBar";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/router";
import { withAuth } from "@/app/utils/withAuth";
import Image from "next/image"; 

const Favorites = () => {
  const { favorites } = useFavorites();
  const { logout, user, isLoggedIn } = useAuth();
  const router = useRouter();

  return (
    <div>
      <NavBar
        onLogout={logout}
        isLoggedIn={isLoggedIn}
        username={user?.username}
        favoritesCount={favorites.length}
        onFavoritesClick={() => router.push("/favorites")}
      />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">Meus Favoritos</h2>
        {favorites.length > 0 ? (
          <div className="grid grid-cols-3 gap-4">
            {favorites.map((favorite) => {
              const book = favorite.book; 
              return (
                <div key={favorite.id} className="p-4 border rounded">
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
                </div>
              );
            })}
          </div>
        ) : (
          <p>Nenhum livro favoritado.</p>
        )}
      </div>
    </div>
  );
};

export default withAuth(Favorites);
