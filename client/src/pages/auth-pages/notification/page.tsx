import { useForm } from 'react-hook-form';
import { Loader2 } from 'lucide-react';
import { useAllNotificationMutation, useSingleNotificationMutation } from '../../../api/mutations/notification.mutation';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../../../components/ui/card';
import { Form, FormItem, FormLabel } from '../../../components/ui/form';
import FormInput from '../../../components/reusables/form-input';
import { notificationSchema } from '../../../schemas/notification';
import { zodResolver } from '@hookform/resolvers/zod';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';
import { Button } from '../../../components/ui/button';


const NotificationPage = () => {
  const form = useForm({
    resolver: zodResolver(notificationSchema),
    mode: "onChange",
    defaultValues: {
      message: '',
      type: 'Informational',
      priority: 'LowPriority',
      sentby: 'Admin',
      userId: ''
    }
  });

  const singleNotification = useSingleNotificationMutation();
  const allNotification = useAllNotificationMutation();

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
      <CardHeader>
        <CardTitle>Send Notification</CardTitle>
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
              render={(field) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
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
              render={(field) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
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
              label="User ID (Optional - leave empty to send to all users)"
              name="userId"
              form={form}
              placeholder="Enter specific user ID"
            />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Notification
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default NotificationPage;