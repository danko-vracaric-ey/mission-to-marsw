import axios from "axios";
import { useState, useCallback } from "react";
/**
 * A custom hook used to fetch data and from the API
 * @param {string} url  Address of the API we connect to fetch data
 * @returns Boolean that shows loading state, error information and a function that fetches the data with given url
 */
const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);

  const fetchData = useCallback(
    async (setData, post, body) => {
      setIsLoading(true);
      if (!post) {
        try {
          const { status, data } = await axios.get(url);
          if (status !== 200) {
            throw new Error("An error occured");
          }

          setData(data);
        } catch (error) {
          console.log(error, " JA SAM ERROR ");
          setIsError(error.message || "Something went wrong!");
          setIsLoading(false);
        }
      }

      if (post) {
        try {
          const x = await axios.post(url, body);
          setData(x);
        } catch (error) {
          console.log(error, " JA SAM ERROR ");
          setIsError(error.message || "Something went wrong!");
          setIsLoading(false);
        }
      }

      setIsLoading(false);
    },
    [url]
  );

  return {
    isLoading,
    error,
    fetchData,
  };
};

export default useAxios;
