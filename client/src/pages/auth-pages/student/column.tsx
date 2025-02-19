import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "../../../components/ui/checkbox";

export const columns: ColumnDef<any>[] = [
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
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone_number",
    header: "Phone Number",
  },
  {
    accessorKey: "user_type",
    header: "User Type",
  },
  {
    accessorKey: "Bookings",
    header: "Bookings",
    cell: ({ row }) => {
      const bookings = row.original.Bookings;
      return bookings.length > 0 ? (
        <ul>
          {bookings.map((booking: any) => (
            <li key={booking.id}>
              Room: {booking.Room.RoomNumber} | Type: {booking.Room.Type} | Price: {booking.Room.Price} | Status: {booking.status}
            </li>
          ))}
        </ul>
      ) : (
        "No Bookings"
      );
    },
  },
  // {
  //   id: "actions",
  //   enableHiding: false,
  //   cell: ({ row }) => {
  //     return (
  //       <ActionButton
  //         row={row.original}
  //         edit={{ key: "EDIT_USER" }}
  //         delete={{ type: "user" }}
  //       />
  //     );
  //   },
  // },
];
