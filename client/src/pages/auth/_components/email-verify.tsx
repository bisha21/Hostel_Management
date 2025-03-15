import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import FormInput from "../../../components/reusables/form-input";
import { TVerifyEmailSchema, verifyEmailSchema } from "../../../schemas/register";



export default function EmailVerifyForm() {
    const form = useForm<TVerifyEmailSchema>({
        resolver: zodResolver(verifyEmailSchema),
        mode: "onChange",
        values: {
           email:""
        }
    });


    const onSubmit = (data: TVerifyEmailSchema) => {
            console.log(data);
        }

    return (
        <div className="w-full p-4 border rounded-md z-40 bg-card-background">
            {/* <div className="flex justify-center items-center">
                <img src={LOGIN_IMAGE} alt="LOGO" width={150} />
            </div> */}
            <p className="text-center font-medium text-lg">Enter Your Email</p>
            <p className="text-center font-medium text-xs">OTP will sent to your email for reseting your password.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
                    <FormInput
                        label="Enter Your Verified Email"
                        form={form}
                        name="email"
                        type="text"
                        placeholder="email"
                        required
                    />
                    <Button className="w-full mt-4">Send OTP</Button>
                </form>
            </Form>
        </div>
    )
}
