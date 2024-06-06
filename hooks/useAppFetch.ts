import { useEffect, useState } from "react";
import { useToast } from "react-native-toast-notifications";

const useAppFetch = (callback: Function, isTurnedOff: boolean = false) => {
  const toast = useToast();
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async (...args: any[]) => {
    setIsLoading(true);

    try {
      const res = await callback(...args);

      setData(res);
    } catch (error) {
      toast.show((error as Error).message, { type: "danger" });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isTurnedOff) {
      fetchData();
    }
  }, []);

  return { data, isLoading, fetchData };
};

export default useAppFetch;
