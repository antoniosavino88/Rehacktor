import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container mx-auto px-4 lg:px-40 py-6 min-h-screen">
      <div className="relative z-20 h-full text-text pb-20">
        <h2 className="lg:text-2xl font-semibold mb-6 py-10 font-title">
          Ciao{" "}
          <span className="text-accent font-title">
            {session?.user.user_metadata.first_name}
          </span>
          , benvenuto nel tuo profilo
        </h2>

        <div className="bg-primary/50 rounded-xl shadow-md overflow-hidden">
          <h3 className="text-xl font-semibold px-6 py-4 border-b border-tertiary text-center font-title">
            I tuoi giochi preferiti
          </h3>

          {favorites.length === 0 ? (
            <div className="px-6 py-4">
              <p className="text-gray-400 italic">
                Non ci sono preferiti al momento...
              </p>
            </div>
          ) : (
            <>
              {/* VERSIONE DESKTOP */}
              <div className="hidden md:block overflow-x-auto">
                <table className="min-w-full bg-secondary/50 text-sm text-text">
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
                        <td className="px-6 py-4 font-medium whitespace-nowrap">
                          {game.game_name}
                        </td>
                        <td className="px-6 py-4">
                          <Link
                            to={`/games/${game.game_slug}/${game.game_id}`}
                            className="inline-block bg-primary border border-accent hover:bg-accent hover:text-primary text-accent font-semibold px-4 py-2 rounded-lg transition duration-300 shadow-sm"
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

              {/* VERSIONE MOBILE */}
              <div className="block md:hidden px-4 py-4 space-y-4">
                {favorites.map((game) => (
                  <div
                    key={game.id}
                    className="bg-secondary/50 rounded-lg shadow-md p-4 flex flex-col gap-3"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={game.game_image}
                        alt={game.game_name}
                        className="w-16 h-16 rounded object-cover shadow"
                      />
                      <div className="flex-1">
                        <p className="font-semibold">{game.game_name}</p>
                      </div>
                      <button
                        className="text-error hover:text-error-hover transition"
                        onClick={() => removeFavorite(game.game_id)}
                        title="Rimuovi"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                    <Link
                      to={`/games/${game.game_slug}/${game.game_id}`}
                      className="text-center bg-primary border border-accent hover:bg-accent hover:text-primary text-accent font-semibold py-2 px-4 rounded-lg mt-2 transition"
                    >
                      Vai al gioco
                    </Link>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
