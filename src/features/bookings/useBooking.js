import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router";

export function useBooking() {
  const { bookingId } = useParams();

  const {
    isLoading,
    data: booking,
    error,
  } = useQuery({
    // This is the key to ask for data, then it could be used in another component to use data CACHED, this must be an array, with a simple string or a complex object
    queryKey: ["booking", bookingId],
    //Here defines which function will be used to fetch data
    queryFn: () => getBooking(bookingId),
    //disable auto-retry (3times by default)
    retry: false,
  });

  return { isLoading, booking, error };
}
