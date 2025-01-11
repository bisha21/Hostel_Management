import { TDeleteItem } from "../api/mutations/delete.mutation";
import { TModalKeys } from "../modals/data";
import { TCategoryType } from "../schemas/category";

export type ModalType<K extends TModalKeys> = {
  initiatorName?: string;
  data?: TModalDataMap[K];
};

export interface TModalDataMap {
  DELETE_ITEM: {
    type: TDeleteItem["type"];
  };
  EDIT_CATEGORY: TCategoryType;
  [key: string]: undefined | Record<string, any>;
}
