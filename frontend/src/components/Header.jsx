import React from 'react';

import {assets} from '../assets/assets_frontend/assets.js'
const Header = () => {
  return (
    <header className="flex flex-col md:flex-row justify-between items-center px-6 py-10 bg-gray-100 border-b-2 border-gray-300">
      <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8 text-center md:text-left">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Rezerviraj termin kod našeg stručnjaka!
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          Rezervirajte svoj pregled brzo i jednostavno. Kliknite na gumb ispod za više informacija o našim doktorima.
        </p>
        <a
          className="bg-gray-800 hover:bg-gray-500 text-white font-semibold py-3 px-6 rounded-4xl shadow transition duration-300 "
          href="/doctors"
        >
          Pogledaj doktore
        </a>
      </div>
      <div className="w-full md:w-1/2 flex justify-center md:justify-end ">
        <img
          src={assets.header_img}
          alt="Slika doktora"
          className="md:w-2/3 h-auto rounded-lg shadow-md min-w-[300px]"
        />

      </div>
    </header>
  );
};

export default Header;
