import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SubFooter from "./components/subFooter.jsx";
import Loader from "./service/commonLoader.jsx";
import Home from "./pages/Home.jsx";  
import OurStory from "./pages/About.jsx";
import Program from "./pages/OurProgram.jsx";
import AdminDashboard from "./pages/adminDashboard/adminDashboard.jsx";
import OurPeople from "./pages/OurPeople.jsx";
import YourFuture from "./pages/YourFuture.jsx";

import { LoaderProvider, LoaderContext } from "./context/LoaderContext.jsx";
import ScrollToTop from "./service/scrollTop.jsx";


// 🔥 Layout
const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <SubFooter />
      <Footer />
    </>
  );
};

// 🔥 Routes + Loader
const AppContent = () => {
  const { loading } = useContext(LoaderContext);

  return (
    <>
      {loading && <Loader />}

      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/ourStory" element={<MainLayout><OurStory /></MainLayout>} />
        <Route path="/ourProgram" element={<MainLayout><Program /></MainLayout>} />
        <Route path="/ourPeople" element={<MainLayout><OurPeople /></MainLayout>} />
        <Route path="/yourFuture" element={<MainLayout><YourFuture /></MainLayout>} />

        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

function App() {
  return (
    <LoaderProvider>
      <BrowserRouter>
              <ScrollToTop />

        <AppContent />
      </BrowserRouter>
    </LoaderProvider>
  );
}

export default App;