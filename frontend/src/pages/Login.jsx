import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
    // Basic form validation
    if (email && password) {
      // Save login state to localStorage
      localStorage.setItem('isLoggedIn', 'true'); // Store login status in localStorage
      navigate('/'); // Redirect to home after successful login
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="flex items-center justify-center h-[50vh] bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your email"
          />
        </div>
        <div className="mt-4">
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 p-2 w-full border border-gray-300 rounded-md"
            placeholder="Enter your password"
          />
        </div>
        <div className="mt-4">
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-gray-800 text-white rounded-md"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
