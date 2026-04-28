import React, { useContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import SubFooter from "./components/subFooter.jsx";
import Loader from "./service/commonLoader.jsx";

import Home from "./pages/Home";
import OurStory from "./pages/About";

// ✅ FIXED (match server file names)
import OurProgram from "./pages/ourProgram";
import OurPeople from "./pages/ourPeople";
import YourFuture from "./pages/yourFuture";

import AdminDashboard from "./pages/adminDashboard/adminDashboard";

import { LoaderProvider, LoaderContext } from "./context/LoaderContext.jsx";
import ScrollToTop from "./service/scrollTop.jsx";

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

const AppContent = () => {
  const { loading } = useContext(LoaderContext);

  return (
    <>
      {loading && <Loader />}

      <Routes>
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/ourStory" element={<MainLayout><OurStory /></MainLayout>} />
        <Route path="/ourProgram" element={<MainLayout><OurProgram /></MainLayout>} />
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