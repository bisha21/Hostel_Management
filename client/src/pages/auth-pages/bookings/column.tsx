import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { TBookingsResponse } from "../../../types/response.types";
import { Checkbox } from "../../../components/ui/checkbox";
import { Button } from "../../../components/ui/button";
import { ActionButton } from "../../../components/reusables/action-button";
// import { ActionButton } from '../../components/reusables/action-button';

export const bookingColumns: ColumnDef<TBookingsResponse>[] = [
  {
    id: "select",
    accessorKey: "id",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "roomId",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Room ID <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "total_amount",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Total Amount <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "booking_date",
    header: "Booking Date",
    cell: ({ row }) => new Date(row.original.booking_date).toLocaleDateString(),
  },
  {
    accessorKey: "startDate",
    header: "Start Date",
    cell: ({ row }) => new Date(row.original.startDate).toLocaleDateString(),
  },
  // {
  //   accessorKey: 'booking_date',
  //   header: 'Booking Date',
  //   cell: ({ row }) => new Date(row.original.booking_date).toLocaleDateString(),
  // },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <ActionButton<TBookingsResponse>
          row={row.original}
          edit={{
            key: "EDIT_BOOKING",
          }}
        />
      );
    },
  },
];
