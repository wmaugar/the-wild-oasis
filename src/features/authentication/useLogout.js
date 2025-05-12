import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout as logoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: logout, isLoading } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      //remove all queries, because "USER" is stored on CACHE memory of React Query.
      queryClient.removeQueries();
      // navigate to login page, and REPLACE log of navigation, so user cannot goes backwards
      navigate("login", { replace: true });
    },
  });

  return { logout, isLoading };
}
