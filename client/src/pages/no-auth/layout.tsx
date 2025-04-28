import { Outlet, useNavigate } from "react-router";
import Navbar from "../auth-pages/student-route/_components/Navbar";
import Footer from "../auth-pages/student-route/_components/Footer";
import useAuthContext from "../../hooks/useAuthContext";

const Applayout = () => {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuthContext();
  if (isAuthenticated && user.user_type === "student") {
    navigate("/student");
  } else if (isAuthenticated && user.user_type === "admin") {
    navigate("/admin");
  } else {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }
};

export default Applayout;
