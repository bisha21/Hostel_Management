import { useForm } from "react-hook-form";
import { editUserSchema } from "../../schemas/register";
import FormInput from "../../components/reusables/form-input";
import { Button } from "../../components/ui/button";
import useModalContext from "../../hooks/useModalContext";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditUser } from "../../api/mutations/auth.mutation";
import { ModalType } from "../../types/modal.types";
import { Form } from "../../components/ui/form";

export default function EditUser({ data }: ModalType<"EDIT_PROFILE">) {
  const { closeModal } = useModalContext();
  const form = useForm({
    resolver: zodResolver(editUserSchema),
    mode: "onChange",
    values: {
      username: data?.username || "",
      address: data?.address || "",
      phone_number: data?.phone || "",
    },
  });
  const { mutate } = useEditUser();
  const onSubmit = (data: any) => {
    mutate(data, {
      onSuccess: () => {
        form.reset();
        closeModal("EDIT_PROFILE");
      },
    });
  };
  return (
    <div>
      <p className="font-semibold">Edit Profile</p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 mt-3"
        >
          <FormInput
            label="Full name"
            form={form}
            name="username"
            type="text"
            placeholder="Jhon Doe"
            required
          />

          <FormInput
            label="Address"
            form={form}
            name="address"
            type="text"
            placeholder="Address"
            required
          />

          <FormInput
            label="Phone number"
            form={form}
            name="phone_number"
            type="number"
            placeholder="9800000000"
            required
          />
          <div className="flex justify-end gap-3">
            <Button
              variant={"outline"}
              className="w-full mt-4"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button className="w-full mt-4" disabled={!form.formState.isValid}>
              Edit Profile
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
