import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './pages/auth-pages/layout';
import Dashboard from './pages/auth-pages/dashboard/page';
import { Toaster } from 'sonner';
import LoginPage from './pages/auth/page';
import AdminProtectedRoute from './pages/auth/admin-protected-route';
import RegisterPage from './pages/auth/register-page';
import ModalX from './modals/modal';
import Applayout from './pages/auth-pages/student-route/Applayout';
import RoomPage from './pages/auth-pages/room/page';
import Home from './pages/auth-pages/student-route/Home';
import Room from './pages/auth-pages/student-route/Room';
import RoomDetail from './pages/auth-pages/student-route/_components/room/Rooms';
import Contact from './pages/auth-pages/student-route/Contact';
import About from './pages/auth-pages/student-route/About';
import BookingPage from './pages/bookings/page';
import StudentProtectedRoute from './pages/auth/student-protected-route';
import MarkAttendance from './pages/auth-pages/student-route/_components/attendance/MarkAttendance';
import AttendancePage from './pages/auth-pages/attendance/page';
import StudentPage from './pages/auth-pages/student/page';
import NotificationPage from './pages/auth-pages/notification/page';

function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <ModalX />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/"
            element={
              <AdminProtectedRoute>
                <Layout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="room" element={<RoomPage />} />
            <Route path='bookings' element={<BookingPage />} />
            <Route path='attendance' element={<AttendancePage />} />
            <Route path='students' element={<StudentPage />} />
            <Route path='students' element={<StudentPage />} />
            <Route path='notification' element={<NotificationPage />} />
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
            <Route path='/student/rooms' element={<Room />} />
            <Route path='/student/attendance' element={<MarkAttendance />} />
            <Route path='/student/rooms/:id' element={<RoomDetail />} />
            <Route path='/student/contact' element={<Contact/>} />
            <Route path='/student/about' element={<About/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
