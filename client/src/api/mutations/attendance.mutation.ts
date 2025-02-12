import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

type TAttendanceData = {
    userId: string;
    status: string;
}
export const useAttendanceMutation = () => {
    const attendanceMutation = useMutation({
        mutationFn: (data: TAttendanceData) => api.post(`/attendance/`, data),
    }
    )
    return attendanceMutation;
}