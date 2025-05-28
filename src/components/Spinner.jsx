function Spinner() {
  return (
    <div className="flex justify-center items-center min-h-[200px]">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-blue-500 border-t-transparent"
        role="status"
        aria-label="Caricamento..."
      ></div>
    </div>
  );
}

export default Spinner;
