import useFetch from "../hooks/useFetch";
import Spinner from "./Spinner";

export default function GenresDropdown() {
  const url =
    "https://api.rawg.io/api/genres?key=d3b1df65b58748b0995c8ac8aec8c20a";
  const { data, isPending, error } = useFetch(url);

  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-slate-800 text-white p-6 shadow-lg overflow-y-auto z-50 scrollbar-hide">
      <h2 className="text-2xl font-semibold mb-6 border-b pb-2 border-slate-600">
        Generi
      </h2>

      {isPending && (
        <div className="flex justify-center items-center h-20">
          <Spinner />
        </div>
      )}

      {error && (
        <div className="bg-red-500 text-white text-sm p-2 mb-4">{error}</div>
      )}

      <ul className="space-y-2">
        {data &&
          data.results.map((genre) => (
            <li
              key={genre.id}
              className="cursor-pointer hover:bg-slate-700 px-3 py-1.5 transition duration-200"
            >
              {genre.name}
            </li>
          ))}
      </ul>
    </aside>
  );
}
