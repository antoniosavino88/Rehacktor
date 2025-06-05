import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import PacmanLoader from "react-spinners/PacmanLoader";
import useFetchSolution from "../../hooks/useFetch";

export default function SearchPage() {
  let [searchParams] = useSearchParams();
  const game = searchParams.get("query");

  const initialUrl = `https://api.rawg.io/api/games?key=2a8cb120892248bd952e976161641d53&search=${game}`;
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <>
      <h1 className="text-3xl font-bold text-white my-10">
        Risultati per: {game} game
      </h1>

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <PacmanLoader color="#FBBF24" />{" "}
        </div>
      )}

      <div className="grid-games-list grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {error && (
          <article className="bg-red-500 text-white p-3">{error}</article>
        )}
        {data &&
          data.results.map((game) => <CardGame key={game.id} game={game} />)}
      </div>
    </>
  );
}
