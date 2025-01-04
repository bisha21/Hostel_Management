import { BrowserRouter, Route, Routes } from "react-router"
import Layout from "./pages/auth-pages/layout"
import Dashboard from "./pages/auth-pages/dashboard/page"
import { Toaster } from "sonner"
import LoginPage from "./pages/auth/page"
import ProtectedRoute from "./pages/auth/protected-route"
import RegisterPage from "./pages/auth/register-page"
import ModalX from "./modals/modal"


function App() {
  return (
    <>
      <Toaster richColors closeButton />
      <ModalX/>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path='/' element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }>
            <Route index element={<Dashboard />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
