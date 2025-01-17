import { api } from "../api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastTrigger } from "../../lib/utils";
import useModalContext from "../../hooks/useModalContext";

export type TDeleteItem = {
  initiatorName: string;
  type: "room" | undefined;
};
export const useDeleteItem = (
  queryClient: ReturnType<typeof useQueryClient>,
) => {
  const { closeModal } = useModalContext();
  const { mutate: deleteRoom } = useMutation({
    mutationFn: (data: string) => api.delete(`/room/${data}/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["room"] });
      closeModal("DELETE_ITEM");
      toastTrigger("Room deleted successfully", undefined, "success");
    },
    onError: (error) => {
      console.error(error);
      toastTrigger(`Room deletion failed`, undefined, "error");
    },
  });

  function deleteHandler({ initiatorName, type }: TDeleteItem) {
    switch (type) {
      case "room":
        deleteRoom(initiatorName);
        break;
      default:
        break;
    }
  }
  return deleteHandler;
};
