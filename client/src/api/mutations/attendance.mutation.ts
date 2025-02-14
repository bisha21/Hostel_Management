import { useMutation } from "@tanstack/react-query";
import { api } from "../api";

type TAttendanceData = {
    userId: string;
    status: string;
}

type TApproveAttendanceData = {
    userId: string;
    date: string;
    is_approved: boolean;
}

export const useAttendanceMutation = () => {
    const attendanceMutation = useMutation({
        mutationFn: (data: TAttendanceData) => api.post(`/attendance/`, data),
    }
    )
    return attendanceMutation;
}

export const useApproveAttendance = () => {
    const approveAttendanceMutation = useMutation({
        mutationFn: (data: TApproveAttendanceData) => api.patch(`/attendance/approve`, data),
    }
    )
    return approveAttendanceMutation;
}