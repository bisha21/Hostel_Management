import { DataTable } from "../../../components/reusables/data-table";
import { getColumns } from "./column";
import { useFetchAllAttendances } from "../../../api/queries/attendance.query";
import { DatePicker } from "../../../components/reusables/date-picker";
import { useState } from "react";
import { Skeleton } from "../../../components/ui/skeleton";

export default function AttendanceTable() {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const { data, isFetching } = useFetchAllAttendances(date);
  return (
    <div>
      {isFetching ? (
        <div className="gap-4">
          <Skeleton className="h-8 w-full mb-4"/>
          <Skeleton className="h-[calc(100vh-32px)] w-full"/>
        </div>
      ) : (
        <DataTable
        columns={getColumns()}
        data={data?.attendanceRecords || []}
        functions={{
          search: {
            name: "username",
            placeholder: "Search by name...",
          },
          add: {
            node: (
              <DatePicker 
                onChange={(selectedDate) => { 
                  setDate(
                    selectedDate 
                      ? selectedDate.toISOString().split("T")[0] 
                      : new Date().toISOString().split("T")[0] 
                  );
                }} 
              />
            )
          }
        }}
      />
      )}
    </div>
  );
}

