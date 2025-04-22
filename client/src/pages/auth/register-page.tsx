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
    <div className="relative isolate overflow-hidden bg-slate-50 h-screen">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-slate-200 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="983e3e4c-de6d-4c3f-8d64-b9761d1534cc"
            width={200}
            height={200}
            x="100%"
            y={-1}
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y={-1} className="overflow-visible fill-slate-100/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth={0}
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth={0}
          fill="url(#983e3e4c-de6d-4c3f-8d64-b9761d1534cc)"
        />
      </svg>
      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-emerald-200 to-sky-300 opacity-20"
          style={{
            clipPath:
              "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
          }}
        ></div>
      </div>
      <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
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
        {/* Footer */}
        <div className="absolute bottom-4 text-slate-500 text-xs">
          © 2024-2025 HostelHive™. All Rights Reserved.
        </div>
      </div>
    </div>
    // <div className="w-full h-screen bg-background flex flex-col justify-center items-center relative p-5">
    //   <div className="absolute hidden sm:block right-1 bottom-1">
    //     <img src={REGISTER_IMAGE} alt="LOGO" width={450} />
    //   </div>
    //   <div className="flex flex-col gap-8">
    //     <div className="flex justify-center items-center">
    //       <img src={HORIZONTAL_LOGO} alt="LOGO" width={250} />
    //     </div>
    //     <Form {...form}>
    //       <form
    //         onSubmit={form.handleSubmit(onSubmit)}
    //         className="w-full space-y-4 mt-3 px-10 py-5"
    //       >
    //         {!isRoleSelected ? (
    //           <RoleSelector setIsRoleSelected={setIsRoleSelected} />
    //         ) : (
    //           <RegisterForm isLoading={isLoading} />
    //         )}
    //       </form>
    //     </Form>
    //   </div>
    //   <p className="text-xs z-40">
    //     Go Back to{" "}
    //     <Button
    //       variant="link"
    //       className="underline underline-offset-4 font-semibold text-xs"
    //       onClick={() => (window.location.href = "/login")}
    //       disabled={isLoading}
    //     >
    //       Login
    //     </Button>
    //   </p>
    // </div>
  );
}
