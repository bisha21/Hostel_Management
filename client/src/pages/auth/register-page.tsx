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
    const [isRoleSelected,setIsRoleSelected]=useState(false);
    const {mutate, isLoading} = useRegisterMutation();
    const form = useForm<TRegisterType>({
        resolver: zodResolver(registerSchema),
        mode: "onChange",
        values: {
            name: "",
            password: "",
            confirmPassword:"",
            email: "",
            role: "student",
        }
    });
    const onSubmit = (data: TRegisterType) => {
        mutate(data)
    }
    return (
        <div className="w-full h-screen bg-background flex flex-col justify-center items-center relative">
            <div className="absolute hidden sm:block right-1 bottom-1">
                        <img src={REGISTER_IMAGE} alt="LOGO" width={450} />
                </div>
            <div className="flex flex-col gap-8">
                <div className="flex justify-center items-center">
                    <img src={HORIZONTAL_LOGO} alt="LOGO" width={250} />
                </div>
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
                    {
                        !isRoleSelected ?  <RoleSelector setIsRoleSelected={setIsRoleSelected}/> : <RegisterForm /> 
                    }
                </form>
                </Form>
            </div>
            <p className="text-xs z-40">Go Back to <Button variant={"link"} className="underline underline-offset-4 font-semibold text-xs" onClick={() => window.location.href = "/login"}>Login</Button></p>
        </div>
    )
}
