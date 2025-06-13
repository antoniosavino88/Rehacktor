import { useEffect, useState } from "react";

export default function AlertBanner({
  type = "success",
  message,
  onClose,
  duration = 8000,
}) {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);

  // Primo effetto: ascolta i messaggi e gestisce il ciclo del banner
  useEffect(() => {
    if (message) {
      setShouldRender(true);
    }
  }, [message]);

  // Secondo effetto: attiva visibilità con animazione subito dopo il mount
  useEffect(() => {
    if (shouldRender) {
      // Forza entrata in frame successivo
      requestAnimationFrame(() => setVisible(true));

      // Auto-dismiss
      const hideTimer = setTimeout(() => setVisible(false), duration);
      const removeTimer = setTimeout(() => {
        setShouldRender(false);
        onClose();
      }, duration + 300);

      return () => {
        clearTimeout(hideTimer);
        clearTimeout(removeTimer);
      };
    }
  }, [shouldRender, duration, onClose]);

  if (!shouldRender) return null;

  const baseStyles =
    "fixed top-20 right-6 z-50 px-4 py-3 rounded-md shadow-md flex items-center justify-between min-w-[250px] max-w-xs transition-all duration-300 ease-in-out";

  const typeStyles = {
    success: "bg-success text-text",
    error: "bg-error text-text",
  };

  const animationStyles = visible
    ? "translate-x-0 opacity-100"
    : "translate-x-full opacity-0";

  return (
    <div className={`${baseStyles} ${typeStyles[type]} ${animationStyles}`}>
      <span className="font-medium">{message}</span>
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(() => {
            setShouldRender(false);
            onClose();
          }, 300);
        }}
        className="ml-4 text-lg font-bold hover:opacity-75 cursor-pointer"
      >
        &times;
      </button>
    </div>
  );
}
