import { Plus } from "lucide-react";
import { DataTable } from "../../../components/reusables/data-table";
import { Button } from "../../../components/ui/button";
import { columns } from "./column";
import useModalContext from "../../../hooks/useModalContext";
import { useFetchNotification } from "../../../api/queries/notification.query";
import { useFetchStudents } from "../../../api/queries/student.query";

export default function NotificationTable() {
  const { openModal } = useModalContext();
  const {data} = useFetchNotification();
  const {data:studentDetails} = useFetchStudents();
  const studentEmails = studentDetails?.map((student: any) => student.email);
  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.data || []}
        functions={{
          search: {
            name: "type",
            placeholder: "Search by type...",
          },
          add: {
            node: (
              <Button onClick={()=>{openModal({key: "SEND_NOTIFICATION",data:studentEmails})}}>
                <Plus />
                Send Notification
              </Button>
            ),
          },
        }}
      />
    </div>
  );
}
