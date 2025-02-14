import PageHeader from "../../../components/reusables/page-header";
import AttendanceTable from "./table";


export default function AttendancePage() {
  return (
    <>
      <PageHeader title="Attendance Details" />
      <AttendanceTable />
    </>
  )
}
