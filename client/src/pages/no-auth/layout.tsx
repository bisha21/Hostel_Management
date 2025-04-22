import { Outlet } from "react-router";
import Navbar from "../auth-pages/student-route/_components/Navbar";
import Footer from "../auth-pages/student-route/_components/Footer";

const Applayout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Applayout;
