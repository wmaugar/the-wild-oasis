import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export function useCreateCabin() {
  const queryClient = useQueryClient();
//
  const { mutate: createCabin, isLoading: isCreating } = useMutation({
    mutationFn: createEditCabin,
    onSuccess: () => {
      toast.success("New cabin succesfully created");
      // set state to invalidate to trigger a re-fetch and UI re-render
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      // clear form using reset function from react-hook-form
      //reset();
    },
    onError: (err) => toast.error(err.message),
  });

  return { isCreating, createCabin };
}
