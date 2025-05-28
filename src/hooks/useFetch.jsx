import { useState, useEffect } from "react";

const useFetch = (url, options = {}) => {
  const [data, setData] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const abortCont = new AbortController();

    fetch(url, {
      ...options,
      signal: abortCont.signal,
    })
      .then((res) => {
        if (!res.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return res.json();
      })
      .then((data) => {
        setTimeout(() => {
          setData(data);
          setIsPending(false);
          setError(null);
        }, 1000); // Ritardo di 1 secondo
      })
      .catch((err) => {
        if (err.name === "AbortError") {
          console.log("fetch aborted");
        } else {
          setIsPending(false);
          setError(err.message);
        }
      });

    return () => abortCont.abort();
  }, [url, options]);

  return { data, isPending, error };
};

export default useFetch;
