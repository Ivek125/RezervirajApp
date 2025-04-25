import React from 'react';
import { NavLink } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto px-6">
        {/* Main content */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0 text-center md:text-left">
          
          {/* App name */}
          <div>
            <h1 className="text-xl font-bold">RezervirajApp</h1>
          </div>

          {/* Links */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 items-center">
            <NavLink to="/" className="text-xs text-gray-400 hover:text-white">Home</NavLink>
            <NavLink to="/o-nama" className="text-xs text-gray-400 hover:text-white">O nama</NavLink>
            <NavLink to="/kontakt" className="text-xs text-gray-400 hover:text-white">Kontakt</NavLink>
            <NavLink to="/privacy-policy" className="text-xs text-gray-400 hover:text-white">Privacy Policy</NavLink>
          </div>

          {/* Contact */}
          <div>
            <p className="text-sm">
              Telefon:{' '}
              <a href="tel:+0999999" className="text-gray-300 hover:text-white">
                0999999
              </a>
            </p>
            <p className="text-sm">
              Email:{' '}
              <a href="mailto:example@gmail.com" className="text-gray-300 hover:text-white">
                example@gmail.com
              </a>
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-600 mt-6 pt-4 text-center">
          <p className="text-xs text-gray-400">
            &copy; 2025 RezervirajApp. Sva prava pridržana.
          </p>
        </div>
      </div>
    </footer>
  );
};
