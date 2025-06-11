import useFetchSolution from "../hooks/useFetch";
import Spinner from "./Spinner";
import { Link } from "react-router";

export default function GenresDropdown() {
  const initialUrl =
    "https://api.rawg.io/api/genres?key=2a8cb120892248bd952e976161641d53";
  const { data, loading, error } = useFetchSolution(initialUrl);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-tertiary">
        Generi
      </h2>

      {loading && (
        <div className="flex justify-center items-center h-20">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="bg-error text-text text-sm p-2 mb-4">{error}</div>
      )}

      <ul className="space-y-2">
        {data &&
          data.results.map((genre) => (
            <li
              key={genre.id}
              className="cursor-pointer hover:bg-tertiary px-3 my-1.5 transition duration-200"
            >
              <Link to={`/games/${genre.slug}`}>{genre.name}</Link>
            </li>
          ))}
      </ul>
    </div>
  );
}
