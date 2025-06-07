import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import FavoritesContext from "../../context/FavoritesContext";
import { FaTrashAlt } from "react-icons/fa";

export default function ProfilePage() {
  const { session } = useContext(SessionContext);
  const { favorites, removeFavorite } = useContext(FavoritesContext);

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold text-white mb-6 py-10">
        Ciao{" "}
        <span className="text-yellow-500">
          {session?.user.user_metadata.first_name}
        </span>
        , benvenuto nel tuo profilo
      </h2>

      <div className="bg-slate-800 rounded-xl shadow-md overflow-hidden">
        <h3 className="text-xl text-white font-semibold px-6 py-4 border-b border-slate-700">
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
            <table className="min-w-full bg-slate-900 text-left text-white text-sm">
              <tbody>
                {favorites.map((game) => (
                  <tr
                    key={game.id}
                    className="border-b border-slate-700 hover:bg-slate-800 transition"
                  >
                    <td className="px-6 py-4">
                      <img
                        src={game.game_image}
                        alt={game.game_name}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    </td>
                    <td className="px-6 py-4 font-medium">{game.game_name}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className="text-red-500 hover:text-red-400 transition"
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
