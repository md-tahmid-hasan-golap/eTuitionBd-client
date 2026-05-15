import React, { useContext } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { AuthContext } from "../firebase/AuthContext";
import Spinner from "../Components/Spinner";

const MainLayouts = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="flex flex-col min-h-screen bg-[#fcfcfd]">
      <Navbar />

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayouts;
