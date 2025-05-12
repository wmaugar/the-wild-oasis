import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  // SORT
  const sortyByRaw = searchParams.get("sortBy") || "startDate-desc";

  const [field, direction] = sortyByRaw.split("-");

  const sortBy = { field, direction };
  // PAGINATION
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  // QUERY
  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    // This is the key to ask for data, then it could be used in another component to use data CACHED, this must be an array, with a simple string or a complex object
    // it works as a dependency array of useEffect, if any of this parameters changes, it will REFETCH
    queryKey: ["bookings", filter, sortBy, page],
    //Here defines which function will be used to fetch data
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  // PRE-FETCHING
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isLoading, bookings, error, count };
}
