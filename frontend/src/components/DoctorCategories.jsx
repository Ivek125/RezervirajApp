import React from 'react'
import { Link } from 'react-router-dom'

import dermatologist from '../assets/assets_frontend/dermatologist.png'
import stomatologist from '../assets/assets_frontend/stomatologist.png'
import pediatricians from '../assets/assets_frontend/pediatricians.png'
import general_physician from '../assets/assets_frontend/general_physician.png'

export default function DoctorCategories() {
  const categories = [
    { title: 'Liječnik opće prakse', image: general_physician },
    { title: 'Dermatolog', image: dermatologist },
    { title: 'Stomatolog', image: stomatologist },
    { title: 'Pedijatar', image: pediatricians },
    
  ]

  return (
    <div className="bg-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-3xl font-extrabold text-white mb-10">Specijalizacije Liječnika</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {categories.map((category, index) => (
          <Link
            to={`/doktori/${category.title.toLowerCase()}`} // ili `/doctor/${index}`
            key={category.title}
            className="relative rounded-2xl overflow-hidden flex flex-col items-center justify-center text-center shadow-lg bg-cover bg-center bg-no-repeat transition duration-300 hover:brightness-110 group"
            style={{
              backgroundImage: `url(${category.image})`,
              minHeight: '250px',
            }}
          >
            <div className="absolute inset-0 bg-black/45 z-0 transition duration-300 group-hover:bg-black/30" />
            <div className="relative z-10 text-white px-4 transition duration-300 group-hover:text-gray-200">
              <h3 className="text-xl font-semibold">{category.title}</h3>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
