import { ChevronsRight, ChevronsLeft } from "lucide-react";
import DropdownList from "./DropdownList";

export default function Sidebar({ isOpen, setIsOpen }) {
  return (
    <>
      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-55 bg-opacity-primary text-text p-8 pt-15 bg-primary lg:bg-inherit overflow-y-auto mt-10 transform transition-transform duration-300 ease-in-out z-49 scrollbar-hide ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <DropdownList type="genres" />
        <DropdownList type="platforms" />
        <DropdownList type="developers" />
        <DropdownList type="publishers" />
        <DropdownList type="tags" />
      </aside>
      {/* Toggle tab button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-16 z-49 h-8 w-10 px-3 flex items-center gap-1 bg-opacity-primary text-accent  rounded-r-lg shadow-lg transition-all duration-300 cursor-pointer hover:bg-tertiary ${
          isOpen ? "left-50" : "left-0"
        }`}
      >
        {isOpen ? <ChevronsLeft size={20} /> : <ChevronsRight size={20} />}
      </button>
      {/* Overlay (mobile) */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-primary/80 z-30 transition-opacity md:hidden"
        />
      )}
    </>
  );
}
