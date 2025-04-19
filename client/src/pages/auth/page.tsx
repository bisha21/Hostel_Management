import { Button } from "../../components/ui/button";
import { HORIZONTAL_LOGO } from "../../constants/images";
import LoginForm from "./_components/login-form";

export default function LoginPage() {
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
                <div className="bg-white/80 backdrop-blur-sm p-8 px-2 rounded-lg shadow-lg max-w-md w-full">
                    <div className="flex flex-col gap-8">
                        <div className="flex justify-center items-center">
                            <img src={HORIZONTAL_LOGO} alt="LOGO" width={250} />
                        </div>
                        <LoginForm />
                    </div>
                    <p className="text-xs text-center mt-6 text-slate-600">
                        Don&apos;t have an account?{" "}
                        <Button
                            variant="link"
                            onClick={() => window.location.href = "/register"}
                            className="underline underline-offset-4 font-semibold text-xs text-emerald-600 hover:text-emerald-500 p-0"
                        >
                            Sign Up
                        </Button>
                    </p>
                </div>

                {/* Footer */}
                <div className="absolute bottom-4 text-slate-500 text-xs">
                    © 2024-2025 HostelHive™. All Rights Reserved.
                </div>
            </div>
        </div>
        // <div className="w-full h-screen relative overflow-hidden bg-slate-50">
        //   {/* Background Pattern */}
        //   <div className="absolute inset-0 z-0">
        //     {/* Gradient Background */}
        //     <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-sky-50"></div>

        //     {/* Abstract Pattern */}
        //     <div className="absolute inset-0 opacity-20">
        //       <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        //         <defs>
        //           <pattern id="grid-pattern" width="10" height="10" patternUnits="userSpaceOnUse">
        //             <path d="M 10 0 L 0 0 0 10" fill="none" stroke="emerald" strokeWidth="0.5" opacity="0.3" />
        //           </pattern>
        //           <linearGradient id="emerald-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
        //             <stop offset="0%" stopColor="#10b981" stopOpacity="0.1" />
        //             <stop offset="100%" stopColor="#0ea5e9" stopOpacity="0.2" />
        //           </linearGradient>
        //         </defs>
        //         <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        //         <circle cx="20" cy="20" r="30" fill="url(#emerald-gradient)" />
        //         <circle cx="80" cy="80" r="20" fill="url(#emerald-gradient)" />
        //       </svg>
        //     </div>

        //     {/* Decorative Circles */}
        //     <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 rounded-full bg-emerald-300 opacity-10"></div>
        //     <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 rounded-full bg-sky-300 opacity-10"></div>
        //   </div>

        //   {/* Content Container */}
        //   <div className="relative z-10 w-full h-full flex flex-col justify-center items-center">
        //     <div className="bg-white/80 backdrop-blur-sm p-8 px-2 rounded-lg shadow-lg max-w-md w-full">
        //       <div className="flex flex-col gap-8">
        //         <div className="flex justify-center items-center">
        //           <img src={HORIZONTAL_LOGO} alt="LOGO" width={250} />
        //         </div>
        //         <LoginForm />
        //       </div>
        //       <p className="text-xs text-center mt-6 text-slate-600">
        //         Don&apos;t have an account?{" "}
        //         <Button 
        //           variant="link" 
        //           onClick={() => window.location.href = "/register"} 
        //           className="underline underline-offset-4 font-semibold text-xs text-emerald-600 hover:text-emerald-500 p-0"
        //         >
        //           Sign Up
        //         </Button>
        //       </p>
        //     </div>

        //     {/* Footer */}
        //     <div className="absolute bottom-4 text-slate-500 text-xs">
        //       © 2024-2025 HostelHive™. All Rights Reserved.
        //     </div>
        //   </div>
        // </div>
    );
}