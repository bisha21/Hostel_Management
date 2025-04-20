import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import FormInput from "../../../components/reusables/form-input";
import { TRegisterType } from "../../../schemas/register";

export default function RegisterForm() {
    const form = useFormContext<TRegisterType>();
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);


    useEffect(() => {
        const subscription = form.watch((value, { name }) => {
            if (name === "profile") {
                const files = value.profile;
                if (files && files instanceof FileList && files.length > 0) {
                    const selectedFile = files[0];
                    const objectUrl = URL.createObjectURL(selectedFile);
                    setPreviewUrl(objectUrl);
                } else {
                    setPreviewUrl(null);
                }
            }
        });

        return () => subscription.unsubscribe();
    }, [form.watch]);
    return (
        <div className="min-w-96 p-4 border rounded-md z-40 bg-card-background">
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
                label="Full name"
                form={form}
                name="username"
                type="text"
                placeholder="Full Name"
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
                name="phoneNumber"
                type="number"
                placeholder="9800000000"
                required
            />

            <FormInput
                label="Profile"
                form={form}
                name="profile"
                type="file"
                placeholder="Profile image"
                required
            />

            {previewUrl && (
                <img
                    src={previewUrl}
                    alt="Profile Preview"
                    className="w-24 h-24 object-cover rounded-full mt-2 mx-auto"
                />
            )}

            <Button className="w-full mt-4" disabled={!form.formState.isValid}>
                Register
            </Button>
        </div>
    );
}
