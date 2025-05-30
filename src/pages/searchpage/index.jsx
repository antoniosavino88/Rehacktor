import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetch from "../../hooks/useFetch";
import Spinner from "../../components/Spinner";
import PacmanLoader from "react-spinners/PacmanLoader";

export default function SearchPage() {
  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");

  const url = `https://api.rawg.io/api/games?key=d3b1df65b58748b0995c8ac8aec8c20a&search=${game}`;

  const { data, isPending, error } = useFetch(url);

  return (
    <>
      <h1 className="text-3xl font-bold text-white my-10">
        Risultati per: {game} game
      </h1>

      {isPending && (
        <div className="flex justify-center items-center min-h-[200px]">
          <PacmanLoader color="#FBBF24" />{" "}
        </div>
      )}

      <div className="grid-games-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {error && <article>{error}</article>}
        {data &&
          data.results.map((game) => <CardGame key={game.id} game={game} />)}
      </div>
    </>
  );
}
