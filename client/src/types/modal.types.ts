import { TDeleteItem } from "../api/mutations/delete.mutation";
import { TModalKeys } from "../modals/data";
import { TRoomResponse } from "./response.types";

export type ModalType<K extends TModalKeys> = {
  initiatorName?: string;
  data?: TModalDataMap[K];
};

export interface TModalDataMap {
  DELETE_ITEM: {
    type: TDeleteItem["type"];
  };
  EDIT_ROOM: TRoomResponse;
  [key: string]: any;
}
