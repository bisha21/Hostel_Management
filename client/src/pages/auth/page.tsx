import { Button } from "../../components/ui/button";
import { HORIZONTAL_LOGO } from "../../constants/images"
import LoginForm from "./_components/login-form";


export default function LoginPage() {

    return (
        <div className="w-full h-screen bg-background flex flex-col justify-center items-center relative">
            <div className="flex flex-col gap-8">
                <div className="flex justify-center items-center">
                    <img src={HORIZONTAL_LOGO} alt="LOGO" width={250} />
                </div>
                <LoginForm />
            </div>
            <p className="text-xs z-40">Don&apos;t have an account? <Button variant="link" onClick={() => window.location.href = "/register"} className="underline underline-offset-4 font-semibold text-xs">Sign Up</Button></p>
        </div>
    )
}


