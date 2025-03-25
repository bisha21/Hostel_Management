import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Form } from "../../../components/ui/form";
import FormInput from "../../../components/reusables/form-input";
// import { LOGIN_IMAGE } from "../../../constants/images";
import { otpSchema, TOtpType } from "../../../schemas/register";
import { useVerifyOtp } from "../../../api/mutations/auth.mutation";



export default function OTPForm() {
    const form = useForm<TOtpType>({
        resolver: zodResolver(otpSchema),
        mode: "onChange",
        values: {
           otp:""
        }
    });
    const{mutate}=useVerifyOtp();


    const onSubmit = (data: TOtpType) => {  
        mutate(data);   
        }

    return (
        <div className="w-full p-4 border rounded-md z-40 bg-card-background">
            {/* <div className="flex justify-center items-center">
                <img src={LOGIN_IMAGE} alt="LOGO" width={150} />
            </div> */}
            <p className="text-center font-medium text-lg">Verify Your Mail!</p>
            <p className="text-center font-medium text-xs">OTP has been sent to your email.</p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4 mt-3">
                    <FormInput
                        label="Enter OTP "
                        form={form}
                        name="otp"
                        type="text"
                        placeholder="OTP"
                        required
                    />
                    <Button className="w-full mt-4">Verify OTP</Button>
                </form>
            </Form>
        </div>
    )
}
