import { useFormContext } from "react-hook-form";
import { TRegisterType } from "../../../schemas/register";
import { ADMIN, STUDENT } from "../../../constants/images";
import { Card } from "../../../components/ui/card";
import { cn } from "../../../lib/utils";
import { Button } from "../../../components/ui/button";

export default function RoleSelector({
  setIsRoleSelected,
}: {
  setIsRoleSelected: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const form = useFormContext<TRegisterType>();
  const role = form.watch("user_type");
  return (
    <div>
      <div className="w-full p-4 border rounded-md z-40 bg-white">
        <p className="text-center font-medium text-lg underline underline-offset-4">
          Register
        </p>
        <p className="text-center font-medium text-base">Select your role</p>
        <div className="flex justify-center items-center gap-4 mt-4">
          <Card
            className={cn(
              "bg-transparent p-2 cursor-pointer",
              role === "student" && "border-2 border-primary",
            )}
            onClick={() => form.setValue("user_type", "student")}
          >
            <img src={STUDENT} alt="STUDENT" width={100} />
            <p className="text-black text-xs text-center mt-2">Student</p>
          </Card>
          <Card
            className={cn(
              "bg-transparent p-2 cursor-pointer",
              role === "admin" && "border-2 border-primary",
            )}
          >
            <img
              src={ADMIN}
              alt="ADMIN"
              width={100}
              onClick={() => form.setValue("user_type", "admin")}
            />
            <p className="text-black text-xs text-center mt-2">Admin</p>
          </Card>
        </div>
        <Button className="w-full mt-4" onClick={() => setIsRoleSelected(true)}>
          Next
        </Button>
      </div>
    </div>
  );
}
