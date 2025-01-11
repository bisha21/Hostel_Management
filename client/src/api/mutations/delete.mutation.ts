import { api } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";
import useModalContext from "../../hooks/useModalContext";

export type TDeleteItem = {
  initiatorName: string;
  type: "category" | "ingredient" | undefined;
};
export const useDeleteItem = (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  const { closeModal } = useModalContext();
  const { mutate: deleteCategory } = useMutation({
    mutationFn: (data: string) => api.delete(`/categories/${data}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
      closeModal("DELETE_ITEM");
      toastTrigger("Category deleted successfully", undefined, "success");
    },
    onError: (error) => {
      console.error(error);
      toastTrigger(`Category deletion failed`, undefined, "error");
    },
  });

  function deleteHandler({ initiatorName, type }: TDeleteItem) {
    switch (type) {
      case "category":
        deleteCategory(initiatorName);
        break;
      default:
        break;
    }
  }
  return deleteHandler;
};
