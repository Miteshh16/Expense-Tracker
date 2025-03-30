import React, { useState } from 'react';
import AuthLayouts from '../../Components/layouts/AuthLayouts';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../Components/Inputs/Input';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);  // ✅ Fixed `.test` instead of `.text`
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }

    if (!password) {
      setError("Password cannot be empty");  // ✅ Improved error message
      return;
    }

    setError("");
    console.log("Logging in with:", { email, password });

    // TODO: Implement login API request here
  };

  return (
    <AuthLayouts>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back</h3>
        <p className="text-sm text-slate-700 mt-2 mb-6">
          Please enter your details to log in
        </p>

        <form onSubmit={handleLogin}>
          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="mit@gmail.com"
            type="text"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-full bg-violet-600 text-white py-2 mt-4 rounded-md hover:bg-purple-700 transition"
          >
            Login
          </button>

          <p className="text-[13px] text-slate-800 mt-3">
            Don't have an account?{" "}
            <Link className="font-medium text-primary underline" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayouts>
  );
};

export default Login;
