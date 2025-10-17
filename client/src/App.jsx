import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import AdminDashboard from "./pages/adminDashboard/adminDashboard";
import Praticed from "./pages/practice";


function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/about" element={<About/>} />
          <Route path="/admin" element={<AdminDashboard/>} />
        <Route path="/practice" element={<Praticed/>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
