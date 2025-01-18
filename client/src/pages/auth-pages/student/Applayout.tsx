import Footer from "./_components/Footer";
import Navbar from "./_components/Navbar";
import { Outlet } from "react-router";

const Applayout = () => {
  return (
    <>
      <Navbar />
      <Outlet /> 
      <Footer/>
    </>
  );
};

export default Applayout;
