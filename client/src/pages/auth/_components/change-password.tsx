import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '../../../components/ui/button';
import { Form } from '../../../components/ui/form';
import FormInput from '../../../components/reusables/form-input';
import {
  changePasswordSchema,
  TChangePasswordSchema,
} from '../../../schemas/register';
import { useResetPassword } from '../../../api/mutations/auth.mutation';
// import { LOGIN_IMAGE } from "../../../constants/images";

export default function ChangePasswordForm() {
  const form = useForm<TChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
    mode: 'onChange',
    values: {
      password: '',
      confirmPassword: '',
    },
  });
  const { mutate } = useResetPassword();

  const onSubmit = (data: TChangePasswordSchema) => {
    mutate(data);
  };

  return (
    <div className="w-full p-4 border rounded-md z-40 bg-card-background">
      {/* <div className="flex justify-center items-center">
                <img src={LOGIN_IMAGE} alt="LOGO" width={150} />
            </div> */}
      <p className="text-center font-medium text-lg">Change Your Password</p>
      <p className="text-center font-medium text-xs">
        We got you but remember your password next time.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-4 mt-3"
        >
          <FormInput
            label="Password "
            form={form}
            name="password"
            type="password"
            placeholder=""
            required
          />
          <FormInput
            label="Confirm Password"
            form={form}
            name="confirmPassword"
            type="password"
            placeholder=""
            required
          />
          <Button className="w-full mt-4">Change Password</Button>
        </form>
      </Form>
    </div>
  );
}
