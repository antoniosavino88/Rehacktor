import useFetchSolution from "../hooks/useFetch";
import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import Spinner from "./Spinner";
import { Link } from "react-router";

export default function DropdownList({ type }) {
  const titles = {
    genres: "Generi",
    platforms: "Piattaforme",
    developers: "Sviluppatori",
    publishers: "Distributori",
    tags: "Tags",
  };

  const endpoints = {
    genres:
      "https://api.rawg.io/api/genres?key=2a8cb120892248bd952e976161641d53",
    platforms:
      "https://api.rawg.io/api/platforms?key=2a8cb120892248bd952e976161641d53",
    developers:
      "https://api.rawg.io/api/developers?key=2a8cb120892248bd952e976161641d53",
    publishers:
      "https://api.rawg.io/api/publishers?key=2a8cb120892248bd952e976161641d53",
    tags: "https://api.rawg.io/api/tags?key=2a8cb120892248bd952e976161641d53",
  };

  const { data, loading, error } = useFetchSolution(endpoints[type]);
  const [open, setOpen] = useState(false);

  return (
    <div className="mb-4">
      {/* Header Dropdown */}
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-left text-l font-semibold mb-4 border-b pb-2 border-tertiary hover:text-accent transition cursor-pointer font-title"
      >
        {titles[type] ?? "Sezione"}
        {open ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </button>

      {/* Spinner */}
      {loading && (
        <div className="flex justify-center items-center h-20">
          <Spinner />
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="bg-error text-text text-sm p-2 mb-4">{error}</div>
      )}

      {/* Dropdown content (collapsible) */}
      <ul
        className={`overflow-hidden transition-all duration-300 ease-in-out space-y-2 ${
          open ? "max-h-[3000px]" : "max-h-0"
        }`}
      >
        {data &&
          data.results
            .filter((item) => item.games_count > 0)
            .map((item) => (
              <li
                key={item.id}
                className="cursor-pointer hover:bg-tertiary px-3 py-1 rounded transition"
              >
                <Link
                  to={`/${type}/${type === "genres" ? item.slug : item.id}`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
      </ul>
    </div>
  );
}
