import React, { useState } from "react";

const Signup = () => {
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add validation + API call
    console.log("Signup Data:", formData);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-96 text-white">
        {/* Avatar Circle */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-gray-600 rounded-full"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Display Name:</label>
            <input
              type="text"
              name="displayName"
              value={formData.displayName}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-2 rounded-lg bg-gray-700 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
