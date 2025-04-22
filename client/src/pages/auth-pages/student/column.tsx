import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    id: "sn",
    accessorKey: "sn",
    header: () => <p>S.No</p>,
    cell: ({ row }) => row.index + 1,
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
              Room: {booking.Room.RoomNumber} | Type: {booking.Room.Type} |
              Price: {booking.Room.Price} | Status: {booking.status}
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
