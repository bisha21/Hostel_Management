import { ModalType } from "../types/modal.types";
import AddCategory from "./category/add-category-modal";
import DeleteModal from "./delete-modal";

type TModalData = {
  [key in TModalKeys]: {
    title: string;
    component: React.FC<ModalType<key>>;
  };
};

export type TModalKeys = "ADD_CATEGORY" | "DELETE_ITEM";

export const ModalData: TModalData = {
  ADD_CATEGORY: {
    title: "Add Category",
    component: AddCategory,
  },
  DELETE_ITEM: {
    title: "Delete",
    component: DeleteModal,
  },
};
