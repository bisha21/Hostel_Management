import { DataTable } from "../../../components/reusables/data-table";
import { columns } from "./column";
import { useFetchStudents } from "../../../api/queries/student.query";

export default function StudentTable() {
  const { data } = useFetchStudents();
  return (
    <div>
      <DataTable
        columns={columns}
        data={data || []}
        functions={{
          search: {
            name: "username",
            placeholder: "Search by name...",
          },
        }}
      />
    </div>
  );
}
