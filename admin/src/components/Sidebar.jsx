import React, { useContext, useState } from 'react';
import { AdminContext } from '../context/AdminContext';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets.js';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const [isOpen, setIsOpen] = useState(false);

  const navItemClass =
    'flex items-center gap-3 px-4 py-2 rounded-lg transition-colors hover:bg-gray-700 hover:text-white';

  const activeNavItemClass =
    'bg-gray-700 text-white border-white border-l-4';

  if (!aToken) return null;

  return (
    <>
      {/* Hamburger button - samo na malim ekranima */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded-lg"
      >
        ☰
      </button>

      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-gray-200 w-64 h-screen p-4 transform transition-transform duration-300 
        fixed top-0 left-0 z-40 md:translate-x-0 
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:static`}
      >
        <ul className="flex flex-col gap-2 border-t border-white mt-10 md:mt-0">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeNavItemClass : ''} mt-2`
            }
          >
            <img src={assets.home_icon} alt="" className="bg-white p-2 rounded-xl w-11" />
            <p>Dashboard</p>
          </NavLink>

          <NavLink
            to="/admin/doctors"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeNavItemClass : ''}`
            }
          >
            <img src={assets.people_icon} alt="" className="bg-white p-2 rounded-xl w-11" />
            <p>Doctors</p>
          </NavLink>

          <NavLink
            to="/admin/appointments"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeNavItemClass : ''}`
            }
          >
            <img src={assets.appointment_icon} alt="" className="bg-white p-2 rounded-xl w-11" />
            <p>Appointments</p>
          </NavLink>

          <NavLink
            to="/admin/add-doctor"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${navItemClass} ${isActive ? activeNavItemClass : ''}`
            }
          >
            <img src={assets.add_icon} alt="" className="bg-white p-2 rounded-xl w-11" />
            <p>Add Doctor</p>
          </NavLink>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
