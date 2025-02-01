import { ModalType } from '../../types/modal.types';
import useModalContext from '../../hooks/useModalContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEditBookMutation } from '../../api/mutations/booking.mutation';
import { bookingSchema, TBookingValidationType } from '../../schemas/booking';
import { Form } from '../../components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select';
import { BOOKING_STATUS } from '../../constants';
import FormInput from '../../components/reusables/form-input';
import { Button } from '../../components/ui/button';

export default function EditBooking({
  initiatorName,
  data,
}: ModalType<'EDIT_BOOKING'>) {
  const { closeModal } = useModalContext();
  const form = useForm<TBookingValidationType>({
    mode: 'onChange',
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      status:
        data?.status &&
        ['pending', 'confirmed', 'cancelled'].includes(data.status)
          ? data.status
          : 'pending', // ✅ Ensure the status is valid
    },
  });
  const { mutate } = useEditBookMutation({ initiatorName: initiatorName });

  const onSubmit = (data: TBookingValidationType): void => {
    mutate(data, {
      onSuccess: () => {
        closeModal('EDIT_BOOKING');
      },
    });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          label="Status"
          form={form}
          name="status"
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
                {BOOKING_STATUS.map((status) => (
                  <SelectItem key={status.id} value={status.value}>
                    {status.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          required
        />
        <Button
          className="w-full mt-4"
          disabled={!form.formState.isValid || !form.formState.isDirty}
        >
          Edit
        </Button>
      </form>
    </Form>
  );
}
