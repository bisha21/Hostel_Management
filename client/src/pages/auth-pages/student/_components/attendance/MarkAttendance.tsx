import { useState, useEffect } from "react";
import { useAttendanceMutation } from "../../../../../api/mutations/attendance.mutation";
import useAuthContext from "../../../../../hooks/useAuthContext";
import { useFetchAttendanceDetail } from "../../../../../api/queries/attendance.query";
import { toastTrigger } from "../../../../../lib/utils";
import { useQueryClient } from "@tanstack/react-query";



const MarkAttendance = () => {
    const [time, setTime] = useState<Date>(new Date());
    const [locationAllowed, setLocationAllowed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const { mutate } = useAttendanceMutation();
    const { user } = useAuthContext();
    const { data: attendanceHistory } = useFetchAttendanceDetail();
    const queryClient = useQueryClient();
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const hostelLat = import.meta.env.VITE_HOSTEL_LAT;
                    const hostelLng = import.meta.env.VITE_HOSTEL_LNG;
                    const maxDistance = 0.05;
                    const distance = Math.sqrt(
                        Math.pow(latitude - hostelLat, 2) + Math.pow(longitude - hostelLng, 2)
                    );

                    if (distance <= maxDistance) {
                        setLocationAllowed(true);
                        setMessage("✅ You are inside the hostel. You can mark attendance.");
                    } else {
                        setMessage("⚠️ You are not in the hostel. Attendance cannot be marked.");
                    }
                },
                () => setMessage("⚠️ Geolocation permission denied.")
            );
        } else {
            setMessage("⚠️ Geolocation not supported.");
        }
    }, []);

    const markAttendance = () => {
        if (!locationAllowed) return;
        setLoading(true);
        try {
            if (!user.id) return;
            mutate({ userId: String(user.id), status: "present" }, {
                onSuccess: (data) => {
                    toastTrigger(data.data.message, undefined, 'success');
                    queryClient.invalidateQueries(["attendance"]);
                },
                onError: (data: any) => {
                    toastTrigger((data.response.data.message || "Failed to mark attendance"), undefined, 'error');
                }

            })

            setMessage("✅ Attendance marked successfully!");
        } catch {
            setMessage("❌ Error marking attendance. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="relative isolate overflow-hidden bg-gray-900">
            <svg
                className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
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
                <svg x="50%" y={-1} className="overflow-visible fill-gray-800/20">
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
                    className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
                    style={{
                        clipPath:
                            'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
                    }}
                ></div>
            </div>
            <div className="mt-[-50px] flex h-screen items-center justify-center">
                <div className="p-6 max-w-md mx-auto rounded-lg shadow-md min-h-[calc(100vh-200px)] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm">

                    {/* Digital Clock */}
                    <div className="text-center text-2xl font-bold text-white ">
                        🕒 {time.toLocaleTimeString()}
                    </div>

                    <h2 className="text-xl font-bold text-center mt-4 text-sky-500">Mark Your Attendance</h2>
                    <p className="text-white text-center mt-2">{message}</p>

                    {/* Mark Attendance Button */}
                    <button
                        className={`w-full mt-4 py-2 text-white font-bold rounded ${locationAllowed ? "bg-green-600 hover:bg-green-700" : "bg-gray-400"
                            }`}
                        onClick={markAttendance}
                        disabled={!locationAllowed || loading}
                    >
                        {loading ? "Marking..." : "Mark Present"}
                    </button>

                    {/* Attendance History */}
                    <div className="mt-6">
                        <h3 className="text-lg font-bold text-primary">📜 Attendance History</h3>
                        <table className="w-full mt-2 border-collapse border border-gray-300">
                            <thead>
                                <tr className="bg-gray-200">
                                    <th className="border px-4 py-2">Date</th>
                                    <th className="border px-4 py-2">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {attendanceHistory?.length > 0 ? (
                                    attendanceHistory.map((record: { date: string, status: string }, index: number) => (
                                        <tr key={index} className="text-center">
                                            <td className="border px-4 py-2 text-white">{record.date}</td>
                                            <td
                                                className={`border px-4 py-2 capitalize ${record.status === "present" ? "text-green-600" : "text-red-600"
                                                    }`}
                                            >
                                                {record.status}
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={2} className="text-center text-gray-500 py-2">
                                            No attendance records found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    );
};

export default MarkAttendance;
