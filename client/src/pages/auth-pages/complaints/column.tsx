import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { TComplaintResponse } from "../../../types/response.types";
import { toastTrigger } from "../../../lib/utils";
import { useUpdateComplaintStatusMutation } from "../../../api/mutations/complaint.mutation";
import { useQueryClient } from "@tanstack/react-query";
import { Switch } from "../../../components/ui/switch";

export const ticketColumns: ColumnDef<TComplaintResponse>[] = [
  {
    id: "sn",
    accessorKey: "sn",
    header: () => <p>S.No</p>,
    cell: ({ row }) => row.index + 1,
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
    accessorKey: "category",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Category <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
  },
  {
    accessorKey: "status",
    header: "Approval Status",
    cell: ({ row }) => {
      return <StatusSwitch<TComplaintResponse> row={row.original} />;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const description = row.original.description;
      return description.length > 50
        ? `${description.substring(0, 50)}...`
        : description;
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Created At <ArrowUpDown className="ml-2 h-4 w-4" />
      </Button>
    ),
    cell: ({ row }) => new Date(row.original.createdAt).toLocaleDateString(),
  },
];

function StatusSwitch<T extends TComplaintResponse>({ row }: { row: T }) {
  const { mutate } = useUpdateComplaintStatusMutation({
    initiatorName: String(row.id),
  });
  const queryClient = useQueryClient();

  const handleApprovalToggle = (checked: boolean) => {
    mutate(
      {
        status: checked ? "Completed" : "Pending",
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries(["complaints"]);
          toastTrigger(
            data?.data?.message || "Complaint status updated successfully",
            undefined,
            "success",
          );
        },
      },
    );
  };

  return (
    <Switch
      checked={row.status === "Completed"}
      onCheckedChange={handleApprovalToggle}
      aria-label="Toggle approval"
    />
  );
}
