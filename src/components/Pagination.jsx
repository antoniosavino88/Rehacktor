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
    <div className="flex justify-center items-center gap-4 my-20">
      <button
        onClick={handlePrev}
        disabled={currentPage <= 1}
        className="bg-accent hover:bg-accent-hover text-primary font-bold px-4 py-2 rounded disabled:opacity-50 cursor-pointer transition"
      >
        ← Precedente
      </button>

      <span className="text-text">Pagina {currentPage}</span>

      <button
        onClick={handleNext}
        disabled={!hasNext}
        className="bg-accent hover:bg-accent-hover text-primary font-bold px-4 py-2 rounded disabled:opacity-50 cursor-pointer transition"
      >
        Successiva →
      </button>
    </div>
  );
}
