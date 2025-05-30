import GenresDropdown from "./GenresDropdown";
import Searchbar from "./Searchbar";

export default function Sidebar() {
  return (
    <aside className="fixed top-0 left-0 w-64 h-screen bg-slate-800 text-white p-6 shadow-lg overflow-y-auto z-50 scrollbar-hide">
      <Searchbar />
      <GenresDropdown />
    </aside>
  );
}
