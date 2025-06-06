export default function AlertBanner({ type = "success", message, onClose }) {
  if (!message) return null;

  const baseStyles =
    "px-4 py-3 rounded-md shadow-md flex items-center justify-between";
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
  };

  return (
    <div className={`${baseStyles} ${typeStyles[type]} transition-all`}>
      <span className="font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-4 text-lg font-bold hover:opacity-75"
      >
        &times;
      </button>
    </div>
  );
}
