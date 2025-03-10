import { Plus } from 'lucide-react';
import { DataTable } from '../../../components/reusables/data-table';
import { Button } from '../../../components/ui/button';
import { columns } from './column';
import useModalContext from '../../../hooks/useModalContext';
import { useFetchPayments } from '../../../api/queries/payment';

export default function Paymenttable() {
  const { openModal } = useModalContext();
  const { data } = useFetchPayments();

  return (
    <div>
      <DataTable
        columns={columns}
        data={data?.data || []}
        functions={{
          search: {
            name: 'type',
            placeholder: 'Search by type...',
          },
          add: {
            node: (
              <Button
                onClick={() => {
                  openModal({ key: 'ADD_TRANSACTION', data });
                }}
              >
                <Plus />
                Add Transaction
              </Button>
            ),
          },
        }}
      />
    </div>
  );
}
