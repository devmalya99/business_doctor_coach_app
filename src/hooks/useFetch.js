import { useState } from "react";
import { set } from "react-hook-form";

const useFetch = (cb) => {
  const [data, setData] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fn = async (...args) => {
    setLoading(true);
    setError(null);

    try {
      const response = await cb(...args);

      setData(response);

      setError(null);
    } catch (error) {
      setError(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    loading,
    error,
    fn
  };
};

export default useFetch;