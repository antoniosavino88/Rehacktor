import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import LazyLoadGameImage from "../components/LazyLoadGameImage";
import { Link } from "react-router-dom";
import ToggleFavorite from "./ToggleFavorite";
import { useContext } from "react";
import SessionContext from "../context/SessionContext";

export default function CardGame({ game }) {
  const genres = game.genres;
  const { session } = useContext(SessionContext);

  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <motion.div
      ref={ref}
      className="flex justify-center my-3"
      initial={{ opacity: 0, scale: 0 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 1.5,
        ease: [0.25, 0.1, 0.25, 1],
        delay: 0.1,
      }}
    >
      <article className="bg-primary text-text rounded-xl overflow-hidden shadow-lg transform transition duration-300 hover:scale-104 hover:shadow-2xl max-w-sm w-full">
        <LazyLoadGameImage image={game.background_image} />

        <div className="p-5">
          <h2 className="text-xl font-bold mb-2 truncate">{game.name}</h2>

          <div className="flex flex-wrap gap-2 mb-4">
            {genres.map((g) => (
              <Link
                key={g.id}
                to={`/genres/${g.slug}`}
                className="text-xs font-medium bg-tertiary text-text px-2 py-1 rounded hover:bg-quaternary transition"
              >
                {g.name}
              </Link>
            ))}
          </div>

          <div className="flex justify-between">
            <p className="text-sm mb-4 italic">Rilasciato: {game.released}</p>
            {session && (
              <div className="flex justify-end">
                <ToggleFavorite data={game} />
              </div>
            )}
          </div>

          <div className="flex justify-end">
            <Link
              to={`/games/${game.slug}/${game.id}`}
              className="bg-primary border border-accent hover:bg-accent hover:text-primary text-accent font-semibold py-1 px-3 rounded-lg transition duration-300"
            >
              Vai al gioco
            </Link>
          </div>
        </div>
      </article>
    </motion.div>
  );
}
