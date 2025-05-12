import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useEditCabin() {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // can only pass one element to mutation Fn, for this is neccesary to use a callback function to pass 2 elements as arguments
    mutationFn: ({ newCabinData, id }) => createEditCabin(newCabinData, id),
    onSuccess: () => {
      toast.success("cabin succesfully edited");
      // set state to invalidate to trigger a re-fetch and UI re-render
      queryClient.invalidateQueries({
        queryKey: ["cabin"],
      });
      // clear form using reset function from react-hook-form
    },
    onError: (err) => toast.error(err.message),
  });

  return { isEditing, editCabin };
}
