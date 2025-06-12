import LazyLoadGameImage from "../components/LazyLoadGameImage";
import { Link } from "react-router";
import ToggleFavorite from "./ToggleFavorite";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";

export default function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");
  const { session } = useContext(SessionContext);

  return (
    <div className="flex justify-center my-3">
      <article
        key={game.id}
        className="bg-primary text-text rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl max-w-sm w-3/2"
      >
        <LazyLoadGameImage image={game.background_image} />

        <div className="p-5">
          {session ? (
            <div className="flex justify-end">
              <ToggleFavorite data={game} />
            </div>
          ) : (
            ""
          )}
          <h2 className="text-xl font-bold mb-1">{game.name}</h2>
          <p className="text-sm text-gray-400 mb-2 italic">{genres}</p>
          <p className="text-sm mb-4">Rilasciato: {game.released}</p>
          <div className="flex justify-end">
            <button className="bg-accent hover:bg-accent-hover text-primary font-semibold py-2 px-4 rounded-full transition duration-300">
              <Link to={`/games/${game.slug}/${game.id}`}>Vai al gioco</Link>
            </button>
          </div>
        </div>
      </article>
    </div>
  );
}
