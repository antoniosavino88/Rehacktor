import { useState, useEffect } from "react";

export default function useFetchSolution(initialUrl) {
  const [url, setUrl] = useState(initialUrl);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  // Aggiorna l’URL quando cambia l’iniziale
  useEffect(() => {
    setUrl(initialUrl);
  }, [initialUrl]);

  useEffect(() => {
    if (!url) {
      setError("URL non valido");
      setData(null);
      return;
    }

    const controller = new AbortController();
    const signal = controller.signal;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(url, { signal });
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        const json = await response.json();
        setData(json);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
          setData(null);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    // Cleanup in caso di navigazioni rapide
    return () => controller.abort();
  }, [url]);

  return {
    loading,
    data,
    error,
    updateUrl: setUrl,
  };
}
