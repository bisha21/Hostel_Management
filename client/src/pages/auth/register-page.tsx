import { useForm } from 'react-hook-form';
import { Button } from '../../components/ui/button';
import { HORIZONTAL_LOGO, REGISTER_IMAGE } from '../../constants/images';
import { registerSchema, TRegisterType } from '../../schemas/register';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '../../components/ui/form';
import RoleSelector from './_components/role-selector';
import { useRegisterMutation } from '../../api/mutations/auth.mutation';
import { useState } from 'react';

export default function RegisterPage() {
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const { mutate, isLoading } = useRegisterMutation();

  const form = useForm<TRegisterType>({
    resolver: zodResolver(registerSchema),
    mode: 'onChange',
    defaultValues: {
      name: '',
      password: '',
      confirmPassword: '',
      email: '',
      user_type: 'student',
      address: '',
      phone_number: '',
      profile: '',
    },
  });

  const onSubmit = (data: TRegisterType) => {
    mutate(data);
    console.log(data);
  };

  return (
    <div className="w-full h-screen bg-background flex flex-col justify-center items-center relative p-5">
      <div className="absolute hidden sm:block right-1 bottom-1">
        <img src={REGISTER_IMAGE} alt="LOGO" width={450} />
      </div>
      <div className="flex flex-col gap-8">
        <div className="flex justify-center items-center">
          <img src={HORIZONTAL_LOGO} alt="LOGO" width={250} />
        </div>
        <Form {...form} className="px-4 py-5">
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 mt-3 px-10 py-5"
          >
            {!isRoleSelected ? (
              <RoleSelector setIsRoleSelected={setIsRoleSelected} />
            ) : (
              <>
                {/* Name */}
                <FormField
                  name="username"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="input"
                          placeholder="Enter your name"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  name="email"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="input"
                          placeholder="Enter your email"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  name="password"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="password"
                          className="input"
                          placeholder="Enter your password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Confirm Password */}
                <FormField
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Confirm Password</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          type="password"
                          className="input"
                          placeholder="Confirm your password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* User Type */}
                <FormField
                  name="user_type"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>User Type</FormLabel>
                      <FormControl>
                        <select {...field} className="input">
                          <option value="admin">Admin</option>
                          <option value="student">Student</option>
                        </select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Address */}
                <FormField
                  name="address"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="input"
                          placeholder="Enter your address"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone Number */}
                <FormField
                  name="phoneNumber"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Phone Number</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="input"
                          placeholder="Enter your phone number"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Profile */}
                <FormField
                  name="profile"
                  render={({ field }) => (
                    <FormItem className='flex flex-col'>
                      <FormLabel>Profile</FormLabel>
                      <FormControl>
                        <input
                          {...field}
                          className="input"
                          placeholder="Profile link or details"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button type="submit" className="w-full" isLoading={isLoading}>
                  Register
                </Button>
              </>
            )}
          </form>
        </Form>
      </div>
      <p className="text-xs z-40">
        Go Back to{' '}
        <Button
          variant="link"
          className="underline underline-offset-4 font-semibold text-xs"
          onClick={() => (window.location.href = '/login')}
        >
          Login
        </Button>
      </p>
    </div>
  );
}
