import { Link } from "react-router-dom";
import { useContext } from "react";
import SessionContext from "../../context/SessionContext";
import useFetchSolution from "../../hooks/useFetch";
import CardGame from "../../components/CardGame";
import PacmanLoader from "react-spinners/PacmanLoader";
import bgHero from "../../assets/home.jpg";
import logo from "../../assets/logoBig.png";
import { motion } from "framer-motion";

export default function HomePage() {
  const initialUrl = `https://api.rawg.io/api/games?key=2a8cb120892248bd952e976161641d53&dates=2024-01-01,2024-12-31&page=1`;
  const { data, loading, error } = useFetchSolution(initialUrl);
  const { session } = useContext(SessionContext);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative h-screen w-full">
        <img
          src={bgHero}
          alt="hero background"
          className="absolute inset-0 w-full h-full object-cover object-center z-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-middle/80 to-intersector backdrop-blur-sm"></div>

        <div className="relative z-20 flex flex-col items-center justify-center text-center h-full text-text px-4 pb-20">
          {/* Animated Logo */}
          <motion.img
            src={logo}
            alt="DailyRespawn Logo"
            initial={{ opacity: 0, scale: 0.8, y: -40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
          />

          {/* Animated Title */}
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold pb-12"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1.8, ease: "easeOut" }}
          >
            Benvenuto su DailyRespawn
          </motion.h1>

          {/* Animated CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1.8, ease: "easeOut" }}
          >
            {session ? (
              <Link
                to="/profile"
                className="bg-transparent border border-accent hover:bg-accent hover:text-primary text-accent font-semibold px-6 py-3 rounded-lg transition duration-300"
              >
                Vai al tuo profilo
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-transparent border border-accent hover:bg-accent hover:text-primary text-accent font-semibold px-6 py-3 rounded-lg transition duration-300"
              >
                Registrati ora!
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* SEZIONE GIOCHI */}
      <div className="mx-10 lg:px-60">
        <h1 className="text-3xl font-bold text-text my-10">
          Nuovi e di tendenza
        </h1>

        {loading && (
          <div className="flex justify-center items-center min-h-[200px]">
            <PacmanLoader color="#FBBF24" />
          </div>
        )}

        <div className="grid-games-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {error && (
            <article className="bg-error text-text p-3">{error}</article>
          )}
          {data &&
            data.results.map((game) => <CardGame key={game.id} game={game} />)}
        </div>
      </div>
    </>
  );
}
