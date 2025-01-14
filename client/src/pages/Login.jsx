import React, { useState, useContext, useEffect } from "react";
import Context from "../context/Context";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons for password visibility toggle
import useUser from "../hooks/useUser";

const Login = () => {
  const isLoggedIn = useUser();
  const { login } = useContext(Context); // Access the login function from context
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // State for password visibility
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    invalidCredentials: "",
  });
  const [successMessage, setSuccessMessage] = useState(""); // State for success message
  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible); // Toggle the password visibility
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic here...
    if (!email || !password) {
      setErrors({ ...errors, invalidCredentials: "Please fill in all fields" });
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        // Assume the token is returned on successful login
        localStorage.setItem("userToken", data.token); // Store token in localStorage
        login(); // Update context state to logged in
        setSuccessMessage("Login successful! Redirecting..."); // Show success message
        setTimeout(() => {
          navigate("/"); // Navigate to home page
        }, 2000);
      } else {
        const errorData = await response.json();
        setErrors({
          ...errors,
          invalidCredentials: errorData.message || "Invalid credentials",
        });
      }
    } catch (error) {
      console.error("Login failed:", error);
      setErrors({
        ...errors,
        invalidCredentials: "An error occurred during login.",
      });
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/"); // Redirect to home page if already logged in
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex shadow-2xl h-full w-[90%] m-auto items-center p-8 flex-col mt-4 md:w-[50%] lg:w-[30%] ">
      <form onSubmit={handleSubmit} className="w-full">
        <div>
          <h1 className="text-2xl font-bold mb-4">Login</h1>
          <div className="flex flex-col w-full gap-4">
            {/* Email Input */}
            <label>
              <span className="font-semibold">Email:</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Your Email"
                className={`p-4 border w-full rounded-md outline-none ${
                  errors.email ? "border-red-500" : ""
                }`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </label>

            {/* Password Input */}
            <label>
              <span className="font-semibold">Password:</span>
              <div className="relative">
                <input
                  type={passwordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter Your Password"
                  className={`p-4 border w-full rounded-md outline-none pr-12 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                  required
                />
                {passwordVisible ? (
                  <FaEyeSlash
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
                    aria-label="Hide password"
                  />
                ) : (
                  <FaEye
                    onClick={togglePasswordVisibility}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-gray-800"
                    aria-label="Show password"
                  />
                )}
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </label>

            {/* Invalid Credentials Error */}
            {errors.invalidCredentials && (
              <p className="text-red-500 text-sm mt-2">
                {errors.invalidCredentials}
              </p>
            )}

            {/* Success Message */}
            {successMessage && (
              <p className="text-green-500 text-sm mt-2">{successMessage}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition"
            >
              Log In
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
