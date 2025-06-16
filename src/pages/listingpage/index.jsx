import PacmanLoader from "react-spinners/PacmanLoader";
import { useParams, useLocation, useSearchParams } from "react-router";
import CardGame from "../../components/CardGame";
import useFetchSolution from "../../hooks/useFetch";
import Pagination from "../../components/Pagination";

export default function ListingPage() {
  const params = useParams();
  const location = useLocation();
  const type = location.pathname.split("/")[1];
  const value = params.genre || params.id;
  const [searchParams, setSearchParams] = useSearchParams();
  const page = parseInt(searchParams.get("page")) || 1;

  // Endpoint per giochi (listing)
  const query = (() => {
    if (!value) return "";
    switch (type) {
      case "genres":
        return `genres=${value}`;
      case "platforms":
        return `platforms=${value}`;
      case "developers":
        return `developers=${value}`;
      case "publishers":
        return `publishers=${value}`;
      case "tags":
        return `tags=${value}`;
      default:
        return "";
    }
  })();

  const gamesUrl = `https://api.rawg.io/api/games?key=2a8cb120892248bd952e976161641d53&${query}&page=${page}`;
  const { data, loading, error } = useFetchSolution(gamesUrl);

  // Endpoint per il nome della categoria
  const getCategoryUrl = () => {
    if (!value) return null;

    switch (type) {
      case "genres":
        return `https://api.rawg.io/api/genres/${value}?key=2a8cb120892248bd952e976161641d53`;
      case "platforms":
        return `https://api.rawg.io/api/platforms/${value}?key=2a8cb120892248bd952e976161641d53`;
      case "developers":
        return `https://api.rawg.io/api/developers/${value}?key=2a8cb120892248bd952e976161641d53`;
      case "publishers":
        return `https://api.rawg.io/api/publishers/${value}?key=2a8cb120892248bd952e976161641d53`;
      case "tags":
        return `https://api.rawg.io/api/tags/${value}?key=2a8cb120892248bd952e976161641d53`;
      default:
        return null;
    }
  };

  const categoryUrl = getCategoryUrl();
  const { data: categoryData } = useFetchSolution(categoryUrl);

  const categoryName =
    categoryData?.name ?? (type === "genres" ? value : `#${value}`);

  return (
    <div className="mx-10 lg:px-60">
      <h1 className="text-3xl font-bold text-text my-10 capitalize">
        {categoryName} games
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

      {data && (
        <Pagination
          currentPage={page}
          hasNext={!!data?.next}
          onPageChange={(newPage) => setSearchParams({ page: newPage })}
        />
      )}
    </div>
  );
}
