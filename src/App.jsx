import env from "react-dotenv";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React, { useEffect } from "react";
import Home from "./Pages/Home/Home";
import Header from "./Components/header/Header";
import Footer from "./Components/footer/Footer";
import Login from "./Pages/auth/Login";
import Register from "./Pages/auth/Register";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { getLoginStatus } from "./redux/features/auth/authSlice";
import Profile from "./Pages/profile/Profile";
const App = () => {
  axios.defaults.withCredentials = true;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getLoginStatus());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        <Header />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
