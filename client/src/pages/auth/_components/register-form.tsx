import { useFormContext } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import FormInput from "../../../components/reusables/form-input";
import { TRegisterType } from "../../../schemas/register";


export default function RegisterForm() {
    const form = useFormContext<TRegisterType>();

    return (
        <div className="w-full p-4 border rounded-md z-40 bg-card-foreground">
            <p className="text-center font-medium text-lg underline underline-offset-4">Register</p>
                    <FormInput 
                        label="Email" 
                        form={form} 
                        name="email" 
                        type="email" 
                        placeholder="harekrishna@gmail.com" 
                        required
                        />

                    <FormInput 
                        label="Username" 
                        form={form} 
                        name="name" 
                        type="text" 
                        placeholder="Username" 
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
                        
                        <FormInput 
                        label="Confirm Password" 
                        form={form} 
                        name="confirmPassword" 
                        type="password" 
                        placeholder="Password"
                        required
                        />
                    <Button className="w-full mt-4">Register</Button>
        </div>
    )
}
