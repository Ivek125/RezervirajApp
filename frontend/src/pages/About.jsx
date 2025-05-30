import React from 'react';
import { Link } from 'react-router-dom';
import { assets } from '../assets/assets_frontend/assets.js'; // Adjust the import path as necessary


const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="py-36 bg-cover bg-center" style={{ backgroundImage: `url(${assets.about1})` }}>
        <div className="text-center text-white">
          <div className="bg-gray-800/80 5 p-6 rounded-lg shadow-lg max-w-2xl mx-auto mb-4">
          <h1 className="text-4xl font-extrabold mb-4">O našoj bolnici</h1>
          <p className="text-xl mb-0">Stručnjaci u pružanju najviše kvalitete zdravstvene zaštite</p>
          </div>
          <Link
            to="/kontakt"
            className="bg-gray-800 hover:bg-gray-500 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300"
            onClick={() => window.scrollTo(0, 0)}
          >
            Kontaktirajte nas
          </Link>
        </div>
      </section>

      {/* About Content Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 mb-8">Naša Misija</h2>
        <p className="text-lg text-gray-700 leading-relaxed mb-8">
          Naša bolnica se posvećuje pružanju najkvalitetnije zdravstvene skrbi uz inovativne pristupe i
          najnoviju tehnologiju. Pružamo kompletnu medicinsku uslugu s ciljem očuvanja zdravlja i kvalitete života naših pacijenata.
        </p>
        <p className="text-lg text-gray-700 leading-relaxed mb-16">
          Kroz tim stručnjaka i moderne medicinske uređaje, osiguravamo da svaki pacijent dobije najbolju moguću skrb. Bilo da je riječ o rutinskim pregledima, specijalističkim konzultacijama ili složenim zahvatima, uvijek možete računati na nas.
        </p>
        
        {/* Image Section */}
        <div className="flex justify-center">
          <img
            src={assets.about2}
            alt="Bolnica"
            className="w-full max-w-3xl rounded-lg shadow-lg"
          />
        </div>

        <h3 className="text-2xl font-extrabold text-center text-gray-800 mt-24 mb-18">Zašto odabrati nas?</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Stručnost</h4>
            <p className="text-gray-600">
              Naši liječnici su visoko kvalificirani i imaju dugogodišnje iskustvo u svom području.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Tehnologija</h4>
            <p className="text-gray-600">
              Koristimo najnoviju medicinsku tehnologiju kako bismo osigurali najbolje rezultate za naše pacijente.
            </p>
          </div>
          <div className="text-center">
            <h4 className="text-xl font-semibold text-gray-800 mb-2">Pružamo podršku</h4>
            <p className="text-gray-600">
              Osiguravamo emocionalnu podršku kroz sve faze liječenja, jer zdravlje nije samo fizičko, već i mentalno stanje.
            </p>
          </div>
        </div>
      </section>

      
      
    </div>
  );
};

export default About;
