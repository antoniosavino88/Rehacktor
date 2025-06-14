import { useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import PacmanLoader from "react-spinners/PacmanLoader";
import useFetchSolution from "../../hooks/useFetch";
import Pagination from "../../components/Pagination";

export default function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const game = searchParams.get("query");
  const page = parseInt(searchParams.get("page") || "1");

  const searchUrl = `https://api.rawg.io/api/games?key=2a8cb120892248bd952e976161641d53&search=${game}&page=${page}`;
  const { data, loading, error } = useFetchSolution(searchUrl);

  const handlePageChange = (newPage) => {
    setSearchParams({ query: game, page: newPage });
  };

  return (
    <div className="px-60">
      <h1 className="text-3xl font-bold text-text my-10">
        Risultati per: {game} game
      </h1>

      {loading && (
        <div className="flex justify-center items-center min-h-[200px]">
          <PacmanLoader color="#FBBF24" />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {error && <article className="bg-error text-text p-3">{error}</article>}
        {data &&
          data.results.map((game) => <CardGame key={game.id} game={game} />)}
      </div>

      {/* Paginazione in fondo */}
      {data && (
        <Pagination
          currentPage={page}
          hasNext={!!data.next}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
}
