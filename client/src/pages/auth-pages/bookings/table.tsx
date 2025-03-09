
import { useFetchBookings } from '../../../api/queries/booking.query';
import { DataTable } from '../../../components/reusables/data-table';
import { bookingColumns } from './column';

export default function BookingTable() {
  const { data } = useFetchBookings();
  console.log(data?.data)
  return (
    <div>
      <DataTable
        columns={bookingColumns}
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
