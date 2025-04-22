import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";
import { HORIZONTAL_LOGO, REGISTER_IMAGE } from "../../constants/images";
import { registerSchema, TRegisterType } from "../../schemas/register";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "../../components/ui/form";
import RoleSelector from "./_components/role-selector";
import { useRegisterMutation } from "../../api/mutations/auth.mutation";
import { useState } from "react";
import RegisterForm from "./_components/register-form";
import { UserType } from "../../context/authContext";
import useAuthContext from "../../hooks/useAuthContext";

export default function RegisterPage() {
  const [isRoleSelected, setIsRoleSelected] = useState(false);
  const { mutate, isLoading } = useRegisterMutation();
  const { setUser, setIsAuthenticated } = useAuthContext();
  const form = useForm<TRegisterType>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      user_type: "student",
      address: "",
      phoneNumber: "",
      profile: "",
    },
  });

  const onSubmit = (data: TRegisterType) => {
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
          bookings: response.Bookings,
        };

        setUser(userData);

        localStorage.setItem("authToken", response.authToken);
        localStorage.setItem("user", JSON.stringify(userData));

        setIsAuthenticated(true);
      },
    });
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
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-4 mt-3 px-10 py-5"
          >
            {!isRoleSelected ? (
              <RoleSelector setIsRoleSelected={setIsRoleSelected} />
            ) : (
              <RegisterForm isLoading={isLoading} />
            )}
          </form>
        </Form>
      </div>
      <p className="text-xs z-40">
        Go Back to{" "}
        <Button
          variant="link"
          className="underline underline-offset-4 font-semibold text-xs"
          onClick={() => (window.location.href = "/login")}
          disabled={isLoading}
        >
          Login
        </Button>
      </p>
    </div>
  );
}
