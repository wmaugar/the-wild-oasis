import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting as updateSettingApi } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { mutate: updateSetting, isLoading: isUpdating } = useMutation({
    // can only pass one element to mutation Fn, for this is neccesary to use a callback function to pass 2 elements as arguments
    mutationFn: updateSettingApi,
    onSuccess: () => {
      toast.success("Setting succesfully updated");
      // set state to invalidate to trigger a re-fetch and UI re-render
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
      // clear form using reset function from react-hook-form
    },
    onError: (err) => toast.error(err.message),
  });

  return { isUpdating, updateSetting };
}
