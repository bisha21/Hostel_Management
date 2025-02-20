import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useAllNotificationMutation, useSingleNotificationMutation } from '../../../api/mutations/notification.mutation';
import { Card, CardHeader, CardContent, CardFooter } from '../../../components/ui/card';
import { Form, FormItem } from '../../../components/ui/form';
import FormInput from '../../../components/reusables/form-input';
import { notificationSchema } from '../../../schemas/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';
import { useFetchNotification } from '../../../api/queries/notification.query';


const NotificationPage = () => {
  const form = useForm({
    resolver: zodResolver(notificationSchema),
    mode: "onChange",
    defaultValues: {
      message: '',
      type: 'Informational',
      priority: 'LowPriority',
      sentby: 'Admin',
      email: '',
      userId: ''
    }
  });

  const singleNotification = useSingleNotificationMutation();
  const allNotification = useAllNotificationMutation();
  const { data } = useFetchNotification();
  console.log(data)

  const onSubmit = (data: any) => {
    if (data.userId) {
      singleNotification.mutate(data);
    } else {
      allNotification.mutate(data);
    }
  };

  const isLoading = singleNotification.isLoading || allNotification.isLoading;

  return (
    <Card className="w-full max-w-lg">
      <CardHeader className='py-2'>
      <p className="font-semibold">Send Notification</p>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormInput
              label="Message"
              name="message"
              form={form}
              required
              placeholder="Enter notification message"
            />

            <FormInput
              label='Type'
              name="type"
              form={form}
              required
              render={(field) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informational">Informational</SelectItem>
                      <SelectItem value="Alert">Alert</SelectItem>
                      <SelectItem value="Promotional">Promotional</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormInput
              label="Priority"
              form={form}
              name="priority"
              required
              render={(field) => (
                <FormItem>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HighPriority">High Priority</SelectItem>
                      <SelectItem value="LowPriority">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormInput
              label="Sent By"
              name="sentby"
              form={form}
              required
              placeholder="Enter sender name"
            />

            <FormInput
              label="Email (Optional - leave empty to send to all users)"
              name="email"
              form={form}
              placeholder="Enter specific user email."
              required
            />
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button
              variant={"outline"}
              className="w-full flex-0"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="w-full flex-initial"
              disabled={isLoading}
              loading={isLoading}
            >
              Send Notification
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default NotificationPage;