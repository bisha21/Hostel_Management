import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { Form } from '../../components/ui/form';
import FormInput from '../../components/reusables/form-input';
import useModalContext from '../../hooks/useModalContext';
import {
  useCashPaymentMutation} from '../../api/mutations/payment.mutation';
import { paymnetSchema } from '../../schemas/payment';
import { useFetchRooms } from '../../api/queries/room.query';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';

export default function AddTransaction() {
  const { mutate } = useCashPaymentMutation();
  const { data } = useFetchRooms();
  const { closeModal } = useModalContext();
  const form = useForm({
    resolver: zodResolver(paymnetSchema),
    mode: 'onChange',
    defaultValues: {
      purpose: '',
      transactionId: '',
      amount: '',
      roomName: '',
    },
  });

  //   const { mutate } = useCashPaymentMutation({ bookingId }); // ✅ Pass bookingId

  const onSubmit = (data: any) => {
    console.log('Submitting Data:', data); // ✅ Debugging Step
    mutate(data, {
      onSuccess: () => {
        form.reset();
        closeModal('ADD_TRANSACTION');
      },
    });
  };

  return (
    <div>
      <p className="font-semibold">Add Transaction</p>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 mt-3"
          >
            <FormInput
              label="Transaction Id"
              form={form}
              name="transactionId"
              type="text"
              placeholder="Enter Transaction ID"
              required
            />

            <FormInput
              label="Total Amount"
              form={form}
              name="amount"
              type="number"
              placeholder="Enter Amount"
              required
            />

            <FormInput
              label="Purpose"
              form={form}
              name="purpose"
              type="text"
              placeholder="Enter Purpose"
              required
            />
            <FormInput
              label="Type"
              form={form}
              name="roomName"
              type="select"
              render={(field) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value?.toString()}
                  value={field.value?.toString()}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {data?.data.map((room) => (
                      <SelectItem key={room.id} value={room.RoomNumber}>
                        {room.RoomNumber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
              required
            />

            <div className="flex justify-end gap-3">
              <Button
                variant={'outline'}
                className="w-full mt-4"
                onClick={() => form.reset()}
              >
                Reset
              </Button>
              <Button
                className="w-full mt-4"
                type="submit"
                // disabled={!form.formState.isValid}
              >
                Submit
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
