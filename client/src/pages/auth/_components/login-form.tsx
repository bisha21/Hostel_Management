import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import { TLoginType, loginSchema } from "../../../schemas/login";
import FormInput from "../../../components/reusables/form-input";
import { useLoginMutation } from "../../../api/mutations/auth.mutation";
import { LOGIN_IMAGE } from "../../../constants/images";
import useAuthContext from "../../../hooks/useAuthContext";
import { UserType } from "../../../context/authContext";


export default function LoginForm() {
    const { setUser, setIsAuthenticated } = useAuthContext();
    const form = useForm<TLoginType>({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        values: {
            email: "",
            password: ""
        }
    });

    const { mutate,isLoading } = useLoginMutation();

    const onSubmit = (data: TLoginType) => {
        mutate(data, {

            onSuccess: (res) => {
                const response = res.data.data;
                const userData: UserType = {
                    id: response.id,
                    username: response.username,
                    user_type: response.user_type,
                    address: response.address,
                    phone_number: response.phone_number,
                    profile_picture: response.profile_picture,
                };

                setUser(userData);

                localStorage.setItem('authToken', response.authToken);
                localStorage.setItem('user', JSON.stringify(userData));

                setIsAuthenticated(true);
            },
        })
    }

    return (
        <div className="w-full p-4 border rounded-md z-40 bg-card-background">
            <div className="flex justify-center items-center">
                <img src={LOGIN_IMAGE} alt="LOGO" width={150} />
            </div>
            <p className="text-center font-medium text-lg">Welcome Back!</p>
            <p className="text-center font-medium text-xs">Please enter your details.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
                    <FormInput
                        label="Email"
                        form={form}
                        name="email"
                        type="text"
                        placeholder="email"
                        required
                    />

                    <FormInput
                        label="Password"
                        form={form}
                        name="password"
                        type="password"
                        placeholder="Password"
                        required
                    />


                    <Button className="w-full mt-4" disabled={isLoading}>Login</Button>
                </form>
            </Form>
        </div>
    )
}
