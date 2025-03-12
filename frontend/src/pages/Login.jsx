import React, { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import authStore from "../store/authStore";

const Login = () => {
  const { login, user } = authStore();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    login(formData);
    console.log(formData);
  };
  if (user) return <Navigate to={"/"} replace />;
  return (
    <div className="flex items-center border-b-2 border-level-4 border-dashed justify-center">
      <div
        // style={{
        //   minHeight: `calc(100vh-var(--header-height))`,
        //     minHeight: "100vh",
        // }}
        className="container min-h-[calc(100dvh-calc(var(--header-height)+var(--footer-height)+2px))] mx-auto border-r-2 border-l-2 border-level-4 border-dashed p-8"
      >
        <div className="max-w-md w-full space-y-8 mx-auto">
          {/* Header */}
          <div className="text-center">
            <h2 className="text-3xl font-bold text-level-5">Welcome Back</h2>
            <p className="mt-2 text-sm text-level-5/70">
              New to our platform?{" "}
              <Link to="/register" className="text-level-5 hover:underline">
                Create an account
              </Link>
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-6">
            <div className="space-y-4">
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
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="block w-full px-3 py-2 bg-transparent border-2 border-dashed border-level-4 rounded-md text-level-5 placeholder-level-5/50 focus:outline-none focus:border-level-5 transition-colors"
                    placeholder="Enter your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-level-5"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              {/* <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-level-5 border-2 border-dashed border-level-4 rounded bg-transparent focus:ring-level-5"
                  />
                  <label
                    htmlFor="remember-me"
                    className="ml-2 block text-sm text-level-5"
                  >
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link
                    to="/forgot-password"
                    className="text-level-5 hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div> */}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full flex justify-center py-3 px-4 border-2 border-dashed border-level-5 text-level-5 font-medium rounded-md hover:bg-level-5 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-level-5 transition-colors"
            >
              Sign In
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
