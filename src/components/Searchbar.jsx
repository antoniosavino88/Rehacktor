import { useState } from "react";
import { useNavigate } from "react-router";

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
    <form onSubmit={handleSearch} className="max-w-md mx-auto my-6">
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
        <input
          type="submit"
          value="Go"
          className="px-5 py-2 bg-accent text-primary font-semibold hover:bg-accent-hover transition-colors duration-200 cursor-pointer rounded-r-full"
        />
      </fieldset>
    </form>
  );
}
