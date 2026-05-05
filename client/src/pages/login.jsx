import React, { useState } from "react";
import { authAPI } from "../config/api";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !password) {
      return setError("All fields are required");
    }

    try {
      setLoading(true);

      const res = await authAPI.login({ name, password });
      const data = res.data;

      if (data.success) {
        //  Save token & user
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        setError("");
        toast.success("Login successful!");

        //  Redirect
        navigate("/adminDashboard");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#125785] to-[#0e456b] px-4">
      
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-md p-6 sm:p-8">
        
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#125785] mb-6">
          Admin Login
        </h2>

        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">

          <input
            type="text"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#125785]"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#125785]"
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-[#125785] text-white py-2 rounded-lg hover:bg-[#0e456b] transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default Login;