import { useQuery } from "@tanstack/react-query";
import { getCabins } from "../../services/apiCabins";

export function useCabins() {
  const {
    isLoading,
    data: cabins,
    error,
  } = useQuery({
    // This is the key to ask for data, then it could be used in another component to use data CACHED, this must be an array, with a simple string or a complex object
    queryKey: ["cabin"],
    //Here defines which function will be used to fetch data
    queryFn: getCabins,
  });

  return { isLoading, cabins, error };
}
