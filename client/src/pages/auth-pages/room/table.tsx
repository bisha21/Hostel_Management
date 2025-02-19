import { Plus } from "lucide-react";
import { DataTable } from "../../../components/reusables/data-table";
import { Button } from "../../../components/ui/button";
import { columns } from "./column";
import useModalContext from "../../../hooks/useModalContext";
import { useFetchRooms } from "../../../api/queries/room.query";

export default function RoomTable() {
  const { openModal } = useModalContext();
  const { data } = useFetchRooms();
  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.data || []}
        functions={{
          search: {
            name: "name",
            placeholder: "Search by name...",
          },
          add: {
            node: (
              <Button onClick={()=>{openModal({key: "ADD_ROOM"})}}>
                <Plus />
                Add Room
              </Button>
            ),
          },
        }}
      />
    </div>
  );
}
