import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  //use mutation because something is changing on the server : a user is beeing logged, changing state from offline to logged.
  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      //this line is optional, inmediately caches user info, to prevent a refetch of user info after login as Protected Route component loads, and run useUser hook.
      //
      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard", { replace: true });
      toast.success(`Succesfully login as: ${user.user.email}`);
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect ");
    },
  });
  return { login, isLoading };
}
