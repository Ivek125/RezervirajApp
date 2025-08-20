import React, { useContext } from 'react';
import { AdminContext } from '../context/AdminContext';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'lucide-react';


const Navbar = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const navigate = useNavigate();

  const logout = () => {
    navigate('/');
    if (aToken) {
      setAToken('');
      localStorage.removeItem('aToken');
    }
  };

  return (
    <nav className="bg-gray-800 text-white shadow-lg ml-auto md:ml-5 sm:ml-10">
      <div className="max-w-10xl mx-auto px-6 py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        
        {/* Logo i naslov */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 text-center sm:text-left ">
          <img
            src={assets.admin_logo}
            alt="Logo"
            className="h-10 w-auto mx-auto sm:mx-0"
          />
          <span className="text-lg font-semibold mt-2 sm:mt-0 md:ml-auto">
            {aToken ? 'Admin' : 'Doctor'} Panel
          </span>
        </div>

        {/* Logout */}
        <button
  onClick={logout}
  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition cursor-pointer
             w-1/2 m-auto sm:w-auto sm:mt-0 mb-2  sm:relative top-2 right- sm:mr-0"
>
  <LogOut size={20} />
</button>


      </div>
    </nav>
  );
};

export default Navbar;
