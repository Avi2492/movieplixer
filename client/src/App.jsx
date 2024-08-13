/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./store/authUser.js";
import { RiLoader2Line } from "@remixicon/react";
import WatchPage from "./pages/WatchPage.jsx";
import Footer from "./components/Footer.jsx";

const App = () => {
  const { user, isCheckingAuth, authCheck } = useAuthStore();
  console.log(user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (isCheckingAuth) {
    return (
      <div className="h-screen">
        <div className="flex justify-center items-center bg-black h-full">
          <RiLoader2Line
            className="animate-spin text-orange-500 font-bold"
            size={40}
          />
        </div>
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={!user ? <LoginPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/signup"
          element={!user ? <SignUpPage /> : <Navigate to={"/"} />}
        />
        <Route
          path="/watch/:id"
          element={user ? <WatchPage /> : <Navigate to={"/signup"} />}
        />
      </Routes>
      <Toaster />
      <Footer />
    </>
  );
};

export default App;
