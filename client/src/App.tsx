import { BrowserRouter, Route, Routes } from "react-router";
import Layout from "./pages/auth-pages/layout";
import Dashboard from "./pages/auth-pages/dashboard/page";
import { Toaster } from "sonner";
import LoginPage from "./pages/auth/page";
import AdminProtectedRoute from "./pages/auth/admin-protected-route";
import RegisterPage from "./pages/auth/register-page";
import ModalX from "./modals/modal";
import Applayout from "./pages/auth-pages/student-route/Applayout";
import RoomPage from "./pages/auth-pages/room/page";
import Home from "./pages/auth-pages/student-route/Home";
import Room from "./pages/auth-pages/student-route/Room";
import RoomDetail from "./pages/auth-pages/student-route/_components/room/Rooms";
import Contact from "./pages/auth-pages/student-route/Contact";
import About from "./pages/auth-pages/student-route/About";
import StudentProtectedRoute from "./pages/auth/student-protected-route";
import MarkAttendance from "./pages/auth-pages/student-route/_components/attendance/MarkAttendance";
import AttendancePage from "./pages/auth-pages/attendance/page";
import StudentPage from "./pages/auth-pages/student/page";
import NotificationPage from "./pages/auth-pages/notification/page";
import DiningScheduleAdmin from "./pages/auth-pages/dining/page";
import DiningScheduleView from "./pages/auth-pages/student-route/Dining";
import ComplaintPage from "./pages/auth-pages/student-route/Complaint";
import BookingPage from "./pages/auth-pages/bookings/page";
import PaymentPage from "./pages/auth-pages/payment/page";
import PaymentSuccess from "./pages/auth-pages/student-route/_components/PaymentSuccess";
import OTPPage from "./pages/auth/otp-page";
import VerifyEmailPage from "./pages/auth/veriy-email-page";
import ChangePasswordPage from "./pages/auth/change-password-page";
import ComplaintsPage from "./pages/auth-pages/complaints/page";
import ProfilePage from "./pages/auth-pages/student-route/Profie";
import NotificationsPage from "./pages/auth-pages/student-route/Notification";

function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <ModalX />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify/otp" element={<OTPPage />} />
          <Route path="/verify/email" element={<VerifyEmailPage />} />
          <Route path="/change-password" element={<ChangePasswordPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <Layout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="/admin/room" element={<RoomPage />} />
            <Route path="/admin/bookings" element={<BookingPage />} />
            <Route path="/admin/attendance" element={<AttendancePage />} />
            <Route path="/admin/students" element={<StudentPage />} />
            <Route path="/admin/dining" element={<DiningScheduleAdmin />} />
            <Route path="/admin/notification" element={<NotificationPage />} />
            <Route path="/admin/payment" element={<PaymentPage />} />
            <Route path="/admin/complaints" element={<ComplaintsPage />} />
          </Route>
          <Route
            path="/student"
            element={
              <StudentProtectedRoute>
                <Applayout />
              </StudentProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="/student/rooms" element={<Room />} />
            <Route path="/student/attendance" element={<MarkAttendance />} />
            <Route path="/student/rooms/:id" element={<RoomDetail />} />
            <Route path="/student/contact" element={<Contact />} />
            <Route path="/student/dining" element={<DiningScheduleView />} />
            <Route path="/student/about" element={<About />} />
            <Route path="/student/complaint" element={<ComplaintPage />} />
            <Route
              path="/student/notifications"
              element={<NotificationsPage />}
            />
            <Route
              path="/student/payment-success"
              element={<PaymentSuccess />}
            />
            <Route path="/student/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
