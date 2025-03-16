
import { useFetchComplaints } from '../../../api/queries/complaints.query';
import { DataTable } from '../../../components/reusables/data-table';
import { ticketColumns } from './column';

export default function ComplaintTable() {
  const { data } = useFetchComplaints();
  return (
    <div>
      <DataTable
        columns={ticketColumns}
        data={data?.data || []}
        functions={{
          search: {
            name: 'name',
            placeholder: 'Search by name...',
          },
        }}
      />
    </div>
  );
}
