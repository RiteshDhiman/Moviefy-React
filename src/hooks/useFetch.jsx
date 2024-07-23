import { useEffect, useState } from "react";
import fetchDataFromAPI from "../utils/api";

const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    setLoading("Loading");
    setData(null);
    setErr(null);

    fetchDataFromAPI(url)
      .then((res) => {
        setLoading(false);
        setData(res);
      })
      .catch((err) => {
        setLoading(false);
        setErr(err);
      });
  }, [url]);

  return { data, loading };
};

export default useFetch;
