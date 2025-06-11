import GenresDropdown from "./GenresDropdown";
import Searchbar from "./Searchbar";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-primary text-text p-6 shadow-lg overflow-y-auto scrollbar-hide mt-10">
      <Searchbar />
      <GenresDropdown />
    </aside>
  );
}
