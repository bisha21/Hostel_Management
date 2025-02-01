import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './pages/auth-pages/layout';
import Dashboard from './pages/auth-pages/dashboard/page';
import { Toaster } from 'sonner';
import LoginPage from './pages/auth/page';
import ProtectedRoute from './pages/auth/protected-route';
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
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="room" element={<RoomPage />} />
            <Route path='bookings' element={<BookingPage />} />
          </Route>
          <Route
            path="/student"
            element={
              <ProtectedRoute>
                <Applayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path='/student/rooms' element={<Room />} />
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
