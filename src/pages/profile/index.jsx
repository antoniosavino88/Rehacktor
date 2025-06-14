import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container mx-auto px-40 py-6">
      <h2 className="text-2xl font-semibold text-text mb-6 py-10 font-title">
        Ciao{" "}
        <span className="text-accent font-title">
          {session?.user.user_metadata.first_name}
        </span>
        , benvenuto nel tuo profilo
      </h2>

      <div className="bg-primary rounded-xl shadow-md overflow-hidden">
        <h3 className="text-xl text-text font-semibold px-6 py-4 border-b border-tertiary text-center font-title">
          I tuoi giochi preferiti
        </h3>

        {favorites.length === 0 ? (
          <div className="px-6 py-4">
            <p className="text-gray-400 italic">
              Non ci sono preferiti al momento...
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-secondary text-sm text-text overflow-hidden">
              <tbody>
                {favorites.map((game) => (
                  <tr
                    key={game.id}
                    className="border-b border-tertiary hover:bg-primary transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={game.game_image}
                        alt={game.game_name}
                        className="w-16 h-16 rounded-md object-cover shadow-md"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium textspace-nowrap">
                      {game.game_name}
                    </td>
                    <td className="px-6 py-4">
                      <Link
                        to={`/games/${game.game_slug}/${game.game_id}`}
                        className="inline-blockbg-primary border border-accent hover:bg-accent hover:text-primary text-accent font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-sm"
                      >
                        Vai al gioco
                      </Link>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-error hover:text-error-hover transition cursor-pointer"
                        onClick={() => removeFavorite(game.game_id)}
                        title="Rimuovi dai preferiti"
                      >
                        <FaTrashAlt className="text-lg" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
