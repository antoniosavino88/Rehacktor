import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        const res = await fetch(url, {
          ...options,
          signal: abortCont.signal,
        });

        if (!res.ok) {
          throw new Error("Could not fetch the data for that resource");
        }

        const result = await res.json();

        setTimeout(() => {
          if (isMounted) {
            setData(result);
            setIsPending(false);
            setError(null);
          }
        }, 1000);
      } catch (err) {
        if (err.name === "AbortError") {
          // console.log("Fetch aborted");
        } else if (isMounted) {
          setIsPending(false);
          setError(err.message);
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortCont.abort();
    };
  }, [url, options]);

  return { data, isPending, error };
};

export default useFetch;
