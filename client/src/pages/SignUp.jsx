import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; 

const SignUp = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(""); // For success message
  const navigate = useNavigate(); // Initialize navigate for redirection

  const togglePasswordVisibility = (e) => {
    e.preventDefault();
    setPasswordVisible((prevState) => !prevState);
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let valid = true;
    const newErrors = { email: "", password: "" };

    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }

    if (!validatePassword(password)) {
      newErrors.password = "Password must be at least 8 characters long.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      try {
        const response = await signUp(name, email, password);

        if (response.ok) {
          const data = await response.json();
          setMessage(data.message || "User signed up successfully!");
          setTimeout(() => {
            navigate("/login"); // Redirect to login page after 2 seconds
          }, 2000);
        } else {
          const errorData = await response.json();
          setMessage(
            errorData.message || "An error occurred during registration."
          );
        }
      } catch (error) {
        console.error(error);
        setMessage("An error occurred during registration.");
      }
    }
  };

  // Connection to the server
  const signUp = async (name, email, password) => {
    return await fetch("http://localhost:3000/api/users/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });
  };

  return (
    <div className="flex shadow-2xl h-full w-[90%] m-auto items-center p-8 flex-col mt-4 md:w-[50%] lg:w-[30%] ">
      <form onSubmit={handleSubmit} className="w-full">
        <div>
          <h1 className="text-2xl font-bold mb-4">Sign Up</h1>
          <div className="flex flex-col w-full gap-4">
            {message && (
              <p
                className={`text-center ${
                  message.includes("successfully")
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {message}
              </p>
            )}

            {/* Name Input */}
            <label>
              <span className="font-semibold">Name:</span>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
                className="p-4 border w-full rounded-md outline-none"
                required
              />
            </label>

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

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 text-white p-4 rounded-md hover:bg-blue-600 transition"
            >
              Sign Up
            </button>

            {/* Login Link */}
            <p className="text-center mt-4">
              Do you have an account?{" "}
              <a href="/login" className="text-blue-500 hover:underline">
                Login
              </a>
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
