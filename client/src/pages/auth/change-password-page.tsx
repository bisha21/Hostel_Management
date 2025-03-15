import { useNavigate } from "react-router";
import { Button } from "../../components/ui/button";
import { HORIZONTAL_LOGO } from "../../constants/images"
import ChangePasswordForm from "./_components/change-password";


export default function ChangePasswordPage() {
    const navigate = useNavigate();
    return (
        <div className="w-full h-screen bg-background flex flex-col justify-center items-center relative">
            <div className="flex flex-col gap-8">
                <div className="flex justify-center items-center">
                    <img src={HORIZONTAL_LOGO} alt="LOGO" width={250} />
                </div>
                <ChangePasswordForm />
            </div>
            <p className="text-xs z-40">Go Back to login page <Button variant="link" onClick={() => navigate('/login')} className="underline underline-offset-4 font-semibold text-xs">Log in</Button></p>
        </div>
    )
}


