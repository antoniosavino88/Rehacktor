import { motion, AnimatePresence } from "framer-motion";

export default function Pagination({ currentPage, hasNext, onPageChange }) {
  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      scrollTop();
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNext) {
      scrollTop();
      onPageChange(currentPage + 1);
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentPage}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.3 }}
        className="flex justify-center items-center gap-4 my-20 min-h-[60px]"
      >
        <button
          onClick={handlePrev}
          disabled={currentPage <= 1}
          className="bg-primary border border-accent hover:bg-accent hover:text-primary text-accent font-bold px-3 py-1 rounded disabled:opacity-50 cursor-pointer transition"
        >
          ←
        </button>

        <span className="text-text mx-10">
          Pagina <span className="font-bold text-accent">{currentPage}</span>
        </span>

        <button
          onClick={handleNext}
          disabled={!hasNext}
          className="bg-primary border border-accent hover:bg-accent hover:text-primary text-accent font-bold px-3 py-1 rounded disabled:opacity-50 cursor-pointer transition"
        >
          →
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
