import React from 'react'
import { assets } from '../assets/assets_frontend/assets.js'; // Adjust the import path as necessary

const Contact = () => {
  return (
    <div className="px-6 py-16 bg-gray-100 min-h-screen">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12">
        
        {/* Left side - Text */}
        <div className="md:w-1/2 space-y-6">
          <h1 className="text-4xl font-bold text-gray-800">
            Kontaktirajte nas
          </h1>
          <p className="text-gray-600 text-lg">
            Imate pitanja ili trebate pomoć? Naš tim je ovdje za vas. Kontaktirajte nas putem dolje navedenih podataka ili nas posjetite osobno.
          </p>

          <div className="bg-white/70 backdrop-blur p-6 rounded-2xl shadow-lg space-y-4">
            <div>
              <p className="text-gray-500 font-medium">Email:</p>
              <p className="text-gray-800">info@medicinska-klinika.hr</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Telefon:</p>
              <p className="text-gray-800">+385 1 2345 678</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Adresa:</p>
              <p className="text-gray-800">Zdravstvena ulica 10, 10000 Zagreb, Hrvatska</p>
            </div>
            <div>
              <p className="text-gray-500 font-medium">Radno vrijeme:</p>
              <p className="text-gray-800">Pon - Pet: 08:00 - 18:00</p>
            </div>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="md:w-1/2">
          <img
            src={assets.contact_image}
            alt="Kontakt"
            className="w-full rounded-3xl shadow-xl sm:mt-16"
          />
        </div>
      </div>
    </div>
  )
}

export default Contact
