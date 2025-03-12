import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import authStore from "../store/authStore";

const Register = () => {
  const { user, register } = authStore();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await register({
      email: formData.email,
      password: formData.password,
      username: formData.username,
    });
  };
  if (user) return <Navigate to={"/"} replace />;
  return (
    <div className="flex items-center border-b-2 border-level-4 border-dashed justify-center">
      <div className=" container min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] mx-auto border-r-2 border-l-2 border-level-4 border-dashed p-8">
        <div className="max-w-md w-full space-y-8 mx-auto">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-level-5">Create Account</h2>
            <p className="mt-2 text-sm text-level-5/70">
              Already have an account?{" "}
              <Link to="/login" className="text-level-5 hover:underline">
                Sign in
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
              {/* Username */}
              <div>
                <label
                  htmlFor="username"
                  className="text-sm font-medium text-level-5"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-md text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                  placeholder="Enter your username"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-level-5"
                >
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-md text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-level-5"
                >
                  Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword.password ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-md text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        password: !prev.password,
                      }))
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-level-5"
                  >
                    {showPassword.password ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-level-5"
                >
                  Confirm Password
                </label>
                <div className="mt-1 relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showPassword.confirmPassword ? "text" : "password"}
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-md text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword((prev) => ({
                        ...prev,
                        confirmPassword: !prev.confirmPassword,
                      }))
                    }
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-level-5"
                  >
                    {showPassword.confirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border-2 border-dashed border-level-5 text-level-5 font-medium rounded-md hover:bg-level-5 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-level-5 transition-colors"
            >
              Create Account
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
