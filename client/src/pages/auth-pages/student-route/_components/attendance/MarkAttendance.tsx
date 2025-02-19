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
                    const hostelLat = parseFloat(import.meta.env.VITE_HOSTEL_LAT);
                    const hostelLng = parseFloat(import.meta.env.VITE_HOSTEL_LNG);
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

    // Get today's date in "YYYY-MM-DD" format
    const todayDate = new Date().toISOString().split("T")[0];

    // Check if attendance for today already exists
    const hasMarkedAttendanceToday = attendanceHistory?.some(
        (record: { date: string; status: string }) => record.date === todayDate
    );

    useEffect(() => {
        if (hasMarkedAttendanceToday) {
            setMessage("✅ You have already marked attendance for today.");
        }
    }, [hasMarkedAttendanceToday]);

    const markAttendance = () => {
        if (!locationAllowed || hasMarkedAttendanceToday) return;
        setLoading(true);
        try {
            if (!user.id) return;
            mutate(
                { userId: String(user.id), status: "present" },
                {
                    onSuccess: (data) => {
                        toastTrigger(data.data.message, undefined, "success");
                        queryClient.invalidateQueries(["attendance"]);
                    },
                    onError: (data: any) => {
                        toastTrigger(
                            data.response.data.message || "Failed to mark attendance",
                            undefined,
                            "error"
                        );
                    }
                }
            );

            setMessage("✅ Attendance marked successfully!");
        } catch {
            setMessage("❌ Error marking attendance. Try again.");
        }
        setLoading(false);
    };

    return (
        <div className="relative isolate overflow-hidden bg-gray-900">
            <div className="mt-[-50px] flex h-screen items-center justify-center">
                <div className="p-6 max-w-md mx-auto rounded-lg shadow-md min-h-[calc(100vh-200px)] bg-[rgba(255,255,255,0.1)] backdrop-blur-sm">
                    
                    {/* Digital Clock */}
                    <div className="text-center text-2xl font-bold text-white ">
                        🕒 {time.toLocaleTimeString()}
                    </div>

                    <h2 className="text-xl font-bold text-center mt-4 text-sky-500">
                        Mark Your Attendance
                    </h2>
                    <p className="text-white text-center mt-2">{message}</p>

                    {/* Mark Attendance Button */}
                    <button
                        className={`w-full mt-4 py-2 text-white font-bold rounded ${
                            locationAllowed && !hasMarkedAttendanceToday
                                ? "bg-green-600 hover:bg-green-700"
                                : "bg-gray-400"
                        }`}
                        onClick={markAttendance}
                        disabled={!locationAllowed || loading || hasMarkedAttendanceToday}
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
                                    attendanceHistory.map(
                                        (record: { date: string; status: string }, index: number) => (
                                            <tr key={index} className="text-center">
                                                <td className="border px-4 py-2 text-white">
                                                    {record.date}
                                                </td>
                                                <td
                                                    className={`border px-4 py-2 capitalize ${
                                                        record.status === "present"
                                                            ? "text-green-600"
                                                            : "text-red-600"
                                                    }`}
                                                >
                                                    {record.status}
                                                </td>
                                            </tr>
                                        )
                                    )
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
