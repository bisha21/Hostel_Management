import { ModalType } from "../types/modal.types";
import EditBooking from "./booking/edit-booking";
import DeleteModal from "./delete-modal";
import AddNotification from "./notification/add-notification";
import AddRoom from "./room/add-room";
import EditRoom from "./room/edit-room";

type TModalData = {
  [key in TModalKeys]: {
    title: string;
    component: React.FC<ModalType<key>>;
  };
};

export type TModalKeys = "ADD_ROOM" | "EDIT_ROOM" | "DELETE_ITEM"|"EDIT_BOOKING"|"SEND_NOTIFICATION";

export const ModalData: TModalData = {
  DELETE_ITEM: {
    title: "Delete",
    component: DeleteModal,
  },
  ADD_ROOM: {
    title: "Add Room",
    component: AddRoom,
  },
  EDIT_ROOM: {
    title: "Edit Room",
    component: EditRoom,
  },
  EDIT_BOOKING: {
    title: "Edit Booking",
    component: EditBooking,
  },
  SEND_NOTIFICATION: {
    title: "Send Notification",
    component: AddNotification,
  }
};
