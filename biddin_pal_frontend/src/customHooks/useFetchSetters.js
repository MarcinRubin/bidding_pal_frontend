import { useEffect, useState } from "react";
import axios from "axios";

export default function useFetchSetters(url) {
  axios.defaults.xsrfCookieName = "csrftoken";
  axios.defaults.xsrfHeaderName = "X-CSRFToken";
  axios.defaults.withCredentials = true;

  const controller = new AbortController();

  const client = axios.create({
    baseURL: "http://localhost:8000",
  });

  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await client.get(url, {signal: controller.signal});
        setData(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return [data, setData, error, loading];
}
