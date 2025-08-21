import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { toast } from "react-toastify";

function Login() {
  const { backendUrl, setToken, token } = useContext(AppContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showRegister, setShowRegister] = useState(false); // kontrolira login/registraciju

  const navigate = useNavigate();


//ako korisnik prijavljen nema login stranice
useEffect(() => {
    if (token) {
      navigate("/"); 
      
    }
  }, [token, navigate]);

  // Handle login ili registracija
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (showRegister) {
        // REGISTRACIJA
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Registracija uspješna!");
          navigate("/"); 
        } else {
          toast.error(data.message);
        }
      } else {
        // LOGIN
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("token", data.token);
          setToken(data.token);
          toast.success("Uspješan login!");
          navigate("/");
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error("Greška, pokušaj ponovo.");
    }



  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div className="flex p-10 items-center justify-center min-h-[60vh] bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          {!showRegister ? (
            <>
              <h2 className="text-2xl font-bold mb-4">Login</h2>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Unesi email"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Lozinka
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md" 
                  placeholder="Unesi lozinku"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-800 text-white rounded-md hover:cursor-pointer"
                >
                  Login
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Nemaš račun?</p>
                <button
                  type="button"
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
                <label className="block text-sm font-medium text-gray-700">
                  Ime
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Unesi ime"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Unesi email"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Lozinka
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 p-2 w-full border border-gray-300 rounded-md"
                  placeholder="Unesi lozinku"
                />
              </div>
              <div className="mt-4">
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-800 text-white rounded-md hover:cursor-pointer"
                >
                  Registriraj se
                </button>
              </div>
              <div className="mt-4 text-center">
                <p className="text-sm text-gray-600">Već imaš račun?</p>
                <button
                  type="button"
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
    </form>
  );
}

export default Login;
