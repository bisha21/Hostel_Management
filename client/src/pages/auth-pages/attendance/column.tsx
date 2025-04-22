import { ColumnDef } from "@tanstack/react-table";
import { Button } from "../../../components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Switch } from "../../../components/ui/switch";
import { cn, toastTrigger } from "../../../lib/utils";
import { useApproveAttendance } from "../../../api/mutations/attendance.mutation";
import { useQueryClient } from "@tanstack/react-query";

type TAttendanceResponse = {
  userId: number;
  username: string;
  email: string;
  date: string;
  status: "present" | "absent";
  is_approved: boolean;
};

export function getColumns(): ColumnDef<TAttendanceResponse>[] {
  return [
    {
      id: "sn",
      accessorKey: "sn",
      header: () => <p>S.No</p>,
      cell: ({ row }) => row.index + 1,
    },
    {
      id: "username",
      accessorKey: "username",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Username <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "email",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "date",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Status <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      ),
      cell: ({ row }) => (
        <span
          className={cn(
            row.original.status === "present"
              ? "text-green-600"
              : "text-red-600",
            "capitalize",
          )}
        >
          {row.original.status}
        </span>
      ),
    },
    {
      accessorKey: "is_approved",
      header: "Approval Status",
      cell: ({ row }) => {
        return <StatusSwitch<TAttendanceResponse> row={row.original} />;
      },
    },
  ];
}

function StatusSwitch<T extends TAttendanceResponse>({ row }: { row: T }) {
  const { mutate } = useApproveAttendance();
  const queryClient = useQueryClient();

  const handleApprovalToggle = (checked: boolean) => {
    mutate(
      {
        userId: String(row.userId),
        date: row.date,
        is_approved: checked,
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["attendances"]);
          toastTrigger(
            data?.data?.message || "Approval status updated successfully",
            undefined,
            "success",
          );
        },
      },
    );
  };

  return (
    <Switch
      checked={row.is_approved}
      onCheckedChange={handleApprovalToggle}
      aria-label="Toggle approval"
      disabled={row.status === "absent"}
    />
  );
}
