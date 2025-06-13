import { useState } from "react";
import { useNavigate } from "react-router";
import { Search } from "lucide-react";

export default function Searchbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [ariaInvalid, setAriaInvalid] = useState(null);

  const handleSearch = (event) => {
    event.preventDefault();
    if (typeof search === "string" && search.trim().length !== 0) {
      navigate(`/search?query=${search}`);
      setSearch("");
    } else {
      setAriaInvalid(true);
    }
  };

  return (
    <form onSubmit={handleSearch} className="w-full max-w-5xl mx-auto">
      <fieldset
        role="group"
        className="flex rounded-full overflow-hidden shadow-md bg-primary border border-tertiary focus-within:ring-2 focus-within:ring-accent"
      >
        <input
          type="text"
          name="search"
          placeholder={ariaInvalid ? "Devi cercare qualcosa" : "Search a game"}
          onChange={(event) => setSearch(event.target.value)}
          value={search}
          aria-invalid={ariaInvalid}
          className="w-full px-4 py-2 bg-primary text-text placeholder-gray-400 focus:outline-none"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-accent text-primary font-semibold hover:bg-accent-hover transition-colors duration-200 rounded-r-full flex items-center justify-center cursor-pointer"
        >
          <Search className="w-5 h-5" />
        </button>
      </fieldset>
    </form>
  );
}
