import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './pages/auth-pages/layout';
import Dashboard from './pages/auth-pages/dashboard/page';
import { Toaster } from 'sonner';
import LoginPage from './pages/auth/page';
import AdminProtectedRoute from './pages/auth/admin-protected-route';
import RegisterPage from './pages/auth/register-page';
import ModalX from './modals/modal';
import Applayout from './pages/auth-pages/student/Applayout';
import RoomPage from './pages/auth-pages/room/page';
import Home from './pages/auth-pages/student/Home';
import Room from './pages/auth-pages/student/Room';
import RoomDetail from './pages/auth-pages/student/_components/room/Rooms';
import Contact from './pages/auth-pages/student/Contact';
import About from './pages/auth-pages/student/About';
import BookingPage from './pages/bookings/page';
import StudentProtectedRoute from './pages/auth/student-protected-route';
import MarkAttendance from './pages/auth-pages/student/_components/attendance/MarkAttendance';
import AttendancePage from './pages/auth-pages/attendance/page';

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
