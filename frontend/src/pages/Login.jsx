import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regName, setRegName] = useState('');
  const navigate = useNavigate();

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const isValidPassword = (password) => {
    return (
      password.length >= 8 &&
      /[A-Z]/.test(password) // barem jedno veliko slovo
    );
  };

  const handleLogin = () => {
    if (!email || !password) {
      alert('Molimo unesite i email i lozinku');
      return;
    }
  
    if (!isValidEmail(email)) {
      alert('Unesite ispravan email');
      return;
    }
  
    if (!isValidPassword(password)) {
      alert('Lozinka mora imati barem 8 znakova i jedno veliko slovo');
      return;
    }
  
    localStorage.setItem('isLoggedIn', 'true');
    navigate('/');
    window.location.reload(); // osvježi stranicu nakon navigacije
  };
  

  const handleRegister = () => {
    if (!regName || !regEmail || !regPassword) {
      alert('Ispunite sva polja za registraciju');
      return;
    }

    if (!isValidEmail(regEmail)) {
      alert('Unesite ispravan email');
      return;
    }

    if (!isValidPassword(regPassword)) {
      alert('Lozinka mora imati barem 8 znakova i jedno veliko slovo');
      return;
    }

    alert('Registracija uspješna!');
    setShowRegister(false);
    setEmail(regEmail);
    setPassword(regPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-[60vh] bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        {!showRegister ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Unesi email"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Lozinka</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Unesi lozinku"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleLogin}
                className="w-full py-2 bg-gray-800 text-white rounded-md hover:cursor-pointer"
              >
                Login
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Nemaš račun?</p>
              <button
                onClick={() => setShowRegister(true)}
                className="text-blue-600 hover:underline text-sm mt-1 hover:cursor-pointer"
              >
                Registriraj se
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Registracija</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Ime</label>
              <input
                type="text"
                value={regName}
                onChange={(e) => setRegName(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Unesi ime"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={regEmail}
                onChange={(e) => setRegEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Unesi email"
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Lozinka</label>
              <input
                type="password"
                value={regPassword}
                onChange={(e) => setRegPassword(e.target.value)}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                placeholder="Unesi lozinku"
              />
            </div>
            <div className="mt-4">
              <button
                onClick={handleRegister}
                className="w-full py-2 bg-gray-800 text-white rounded-md hover:cursor-pointer"
              >
                Registriraj se
              </button>
            </div>
            <div className="mt-4 text-center">
              <p className="text-sm text-gray-600">Već imaš račun?</p>
              <button
                onClick={() => setShowRegister(false)}
                className="text-blue-600 hover:underline text-sm mt-1 hover:cursor-pointer"
              >
                Nazad na login
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;
