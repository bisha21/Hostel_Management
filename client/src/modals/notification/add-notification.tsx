import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useSingleNotificationMutation,
  useAllNotificationMutation,
} from "../../api/mutations/notification.mutation";
import { Form, FormItem } from "../../components/ui/form";
import {
  notificationSchema,
  TNotificationSchema,
} from "../../schemas/notification";
import FormInput from "../../components/reusables/form-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Button } from "../../components/ui/button";
import { Checkbox } from "../../components/ui/checkbox";
import { ModalType } from "../../types/modal.types";
import { useState } from "react";
import useModalContext from "../../hooks/useModalContext";
import { useQueryClient } from "@tanstack/react-query";

const AddNotification = ({ data }: ModalType<"SEND_NOTIFICATION">) => {
  const [sendToAll, setSendToAll] = useState(false);
  const { closeModal } = useModalContext();
  const queryClient = useQueryClient();
  const form = useForm<TNotificationSchema>({
    resolver: zodResolver(notificationSchema),
    mode: "onChange",
    defaultValues: {
      message: "",
      type: "Informational",
      priority: "LowPriority",
      sentby: "Admin",
      email: "",
      userId: "",
    },
  });
  console.log(data);
  const singleNotification = useSingleNotificationMutation();
  const allNotification = useAllNotificationMutation();

  const onSubmit = (formData: TNotificationSchema) => {
    if (!sendToAll && formData.email) {
      singleNotification.mutate(
        {
          message: formData.message,
          type: formData.type,
          priority: formData.priority,
          sentby: formData.sentby,
          email: formData.email,
        },
        {
          onSuccess: () => {
            closeModal("SEND_NOTIFICATION");
            queryClient.invalidateQueries(["notifications"]);
          },
        },
      );
    } else {
      allNotification.mutate(
        {
          message: formData.message,
          type: formData.type,
          priority: formData.priority,
          sentby: formData.sentby,
        },
        {
          onSuccess: () => {
            closeModal("SEND_NOTIFICATION");
          },
        },
      );
    }
  };

  const isLoading = singleNotification.isLoading || allNotification.isLoading;

  return (
    <>
      <div className="py-1">
        <p className="font-semibold">Send Notification</p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <FormInput
              label="Message"
              name="message"
              form={form}
              required
              render={(field) => (
                <FormItem>
                  <textarea
                    {...field}
                    className="w-full min-h-[100px] p-2 border rounded-md"
                    placeholder="Enter notification message"
                  />
                </FormItem>
              )}
            />

            <FormInput
              label="Type"
              name="type"
              form={form}
              required
              render={(field) => (
                <FormItem>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select notification type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Informational">
                        Informational
                      </SelectItem>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="HighPriority">
                        High Priority
                      </SelectItem>
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

            <div className="flex items-center space-x-2">
              <Checkbox
                id="send-to-all"
                checked={sendToAll}
                onCheckedChange={(checked) => {
                  setSendToAll(checked === true);
                  if (checked === true) {
                    form.setValue("email", undefined);
                    // Clear validation errors on email field
                    form.clearErrors("email");
                  }
                }}
              />
              <label
                htmlFor="send-to-all"
                className="text-sm font-medium leading-none cursor-pointer"
              >
                Send to all users
              </label>
            </div>

            {!sendToAll && (
              <FormInput
                label="Email"
                name="email"
                form={form}
                placeholder="Enter specific user email."
                required={!sendToAll}
                render={(field) => (
                  <FormItem>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      disabled={sendToAll}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select user email" />
                      </SelectTrigger>
                      <SelectContent>
                        {data?.map((user: any, i: number) => (
                          <SelectItem key={i} value={user}>
                            {user}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            )}
          </div>
          <div className="flex justify-end gap-3 mt-4">
            <Button
              variant={"outline"}
              className="w-full flex-0"
              onClick={() => {
                form.reset();
                setSendToAll(false);
              }}
            >
              Reset
            </Button>
            <Button
              type="submit"
              className="w-full flex-initial"
              disabled={isLoading || (!sendToAll && !form.formState.isValid)}
              loading={isLoading}
            >
              Send Notification
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default AddNotification;
