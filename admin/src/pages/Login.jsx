import React, { useState, useContext } from 'react';
import { assets } from '../assets/assets.js';
import { AdminContext } from '../context/AdminContext.jsx';
import axios from 'axios';
import { toast } from 'react-toastify';


function Login() {
  const [state, setState] = useState('Admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { setAToken, backendUrl } = useContext(AdminContext);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {  
        
        if (state === 'Admin'){

            const {data} = await axios.post(backendUrl + '/api/admin/login', {  
                email,
                password
            });
            if (data.success) { 
                localStorage.setItem('aToken', data.token);
                setAToken(data.token);
                 toast.success(data.message)
                
            }else{
                console.log(data.message);
                 
            }
        }else{

        }
    } catch (error) {
       toast.error('Krivi podaci. Pokušaj ponovo');
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      <form onSubmit={onSubmitHandler} className="bg-white rounded-2xl shadow-2xl w-[420px] overflow-hidden border border-gray-200">
        {/* Header */}
        <div className="bg-gray-800 text-white text-center py-5">
          <h2 className="text-2xl font-semibold tracking-wide">
            <span className="text-gray-800 bg-white p-3 rounded-3xl">{state}</span> Login
          </h2>
        </div>

        {/* Body */}
        <div className="p-8">
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              type="email"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              placeholder="Unesi email"
            />
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Lozinka
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              type="password"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-blue-500 focus:ring focus:ring-blue-200 transition"
              placeholder="Unesi lozinku"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-gray-800 text-white rounded-lg transform transition-all duration-150 hover:bg-gray-900 hover:scale-[0.98] active:scale-[0.96] shadow-md cursor-pointer"
          >
            Login
          </button>

          {/* Toggle text */}
          <div className="mt-4 text-center">
          {
  state === 'Admin' ? (
    <p className="text-sm text-gray-600 text-center mt-4">
      Nisi admin?{' '}
      <span
        onClick={() => setState('Doctor')}
        className="text-blue-600 hover:underline cursor-pointer"
      >
        Doctor Login
      </span>
    </p>
  ) : (
    <p className="text-sm text-gray-600 text-center mt-4">
      Nisi doktor?{' '}
      <span
        onClick={() => setState('Admin')}
        className="text-blue-600 hover:underline cursor-pointer"
      >
        Admin Login
      </span>
    </p>
  )
}

          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
