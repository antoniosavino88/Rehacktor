import LazyLoadGameImage from "../components/LazyLoadGameImage";
import { Link } from "react-router";

export default function CardGame({ game }) {
  const genres = game.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="flex justify-center my-3">
      <article
        key={game.id}
        className="bg-slate-800 text-white rounded-2xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl max-w-sm w-3/2"
      >
        <LazyLoadGameImage image={game.background_image} />

        <div className="p-5">
          <h2 className="text-xl font-bold mb-1">{game.name}</h2>
          <p className="text-sm text-gray-400 mb-2 italic">{genres}</p>
          <p className="text-sm mb-4">Rilasciato: {game.released}</p>

          <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
            <Link to={`/games/${game.slug}/${game.id}`}>Dettagli</Link>
          </button>
        </div>
      </article>
    </div>
  );
}
