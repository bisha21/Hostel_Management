import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { ActionButton } from "../../../components/reusables/action-button";
import { TRoomResponse } from "../../../types/response.types";

export const columns: ColumnDef<any>[] = [
  {
    id: "sn",
    accessorKey: "sn",
    header: () => <p>S.No</p>,
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "RoomNumber",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room Number <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "Capacity",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Capacity <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "Status",
    header: "Status",
  },
  {
    accessorKey: "Type",
    header: "Room Type",
  },
  {
    accessorKey: "Price",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Price <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "Description",
    header: "Description",
  },
  {
    accessorKey: "FloorNumber",
    header: "Floor Number",
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <ActionButton<TRoomResponse>
          row={row.original}
          edit={{
            key: "EDIT_ROOM",
          }}
          delete={{
            type: "room",
          }}
        />
      );
    },
  },
];
