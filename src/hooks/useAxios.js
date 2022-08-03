import axios from "axios";
import { useState } from "react";

const useAxios = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setIsError] = useState(null);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(url);
      console.log(response);
      if (response.status !== 200) {
        throw new Error("An error occured");
      }
      const data = await response.data;
      console.log(response.data);
      setData(data);
    } catch (error) {
      setIsError(error.message || "Something went wrong!");
      setIsLoading(false);
    }
    setIsLoading(false);
  };

  return {
    isLoading,
    error,
    fetchData,
    data,
  };
};

export default useAxios;
